import express from 'express';
import path from 'path';
import fs from 'fs-extra';
import { createServer as createViteServer } from 'vite';
import { Client, Language, PlaceData } from '@googlemaps/google-maps-services-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const CACHE_FILE = path.join(process.cwd(), 'reviews-cache.json');
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

const client = new Client({});

async function getReviews() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn('Google Maps API Key or Place ID missing. Returning mock data.');
    return null;
  }

  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        key: apiKey,
        fields: ['reviews', 'rating', 'user_ratings_total'],
        language: Language.en
      }
    });

    const data = response.data.result;
    
    // Filter for 5 star reviews only
    const reviews = (data.reviews || [])
      .filter((r: any) => r.rating === 5)
      .map((r: any) => ({
        id: r.time.toString() + r.author_name,
        author: r.author_name,
        rating: r.rating,
        comment: r.text,
        date: r.relative_time_description,
        avatar: r.profile_photo_url
      }));

    return {
      reviews,
      rating: data.rating,
      totalReviews: data.user_ratings_total,
      updatedAt: Date.now()
    };
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    return null;
  }
}

app.get('/api/reviews', async (req, res) => {
  try {
    let cacheData = null;
    if (await fs.pathExists(CACHE_FILE)) {
      cacheData = await fs.readJson(CACHE_FILE);
    }

    const isOld = !cacheData || (Date.now() - cacheData.updatedAt > CACHE_TTL);

    if (isOld && process.env.GOOGLE_MAPS_API_KEY) {
      const liveData = await getReviews();
      if (liveData) {
        await fs.writeJson(CACHE_FILE, liveData);
        return res.json(liveData);
      }
    }

    if (cacheData) {
      return res.json(cacheData);
    }

    // Fallback if no API key or no cache exists yet
    res.status(404).json({ error: 'No reviews found/available. Please check configuration.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
