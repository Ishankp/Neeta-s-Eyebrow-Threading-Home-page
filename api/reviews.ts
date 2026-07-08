import { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CACHE_FILE = path.join(os.tmpdir(), 'reviews-cache.json');
const DEFAULT_PLACE_ID = 'ChIJSU5hTsCD54gRE0VjjSqcjxU'; // Use their actual place id here too

interface ReviewsCache {
  timestamp: number;
  rating: number;
  totalReviews: number;
  reviews: any[];
  isFallback: boolean;
}

let memoryCache: ReviewsCache | null = null;
let activeFetchPromise: Promise<ReviewsCache> | null = null;

const FALLBACK_REVIEWS = [
  {
    id: 'r1',
    author: 'Zahra Khan',
    rating: 5,
    comment: "Neeta is the only person I trust with my eyebrows. She keeps my shape thick and perfect every single time! She is a true artist and is incredibly fast and gentle.",
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'r2',
    author: 'Maria Rodriguez',
    rating: 5,
    comment: "The absolute best threading salon in Orlando. The staff is so sweet and professional. The studio is always spotless and they follow amazing hygienic practices.",
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'r3',
    author: 'Samantha Higgins',
    rating: 5,
    comment: "I've been coming to Neeta for facial treatments and brow tinting. The results are amazing! She takes her time and is so gentle. My skin has never looked better.",
    date: '3 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'r4',
    author: 'Emily Rodriguez',
    rating: 5,
    comment: "First time getting a lash lift and brow lamination here and I am obsessed. Neeta did an impressive job and explained all the aftercare so thoroughly. Highly recommend!",
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'r5',
    author: 'Ashley Gordon',
    rating: 5,
    comment: "I drive past three other places just to see Neeta. She is the absolute best, friendly, sanitary, and always leaves my brows looking perfect. Highly recommended!",
    date: '2 months ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

// Helper to write JSON responses
function sendJSON(res: ServerResponse, status: number, data: any) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  });
  res.end(JSON.stringify(data));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Handle OPTIONS preflight requests for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    res.end();
    return;
  }

  try {
    const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const forceRefresh = urlObj.searchParams.get('refresh') === 'true';
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID;
    const oneDayMs = 24 * 60 * 60 * 1000;
    const now = Date.now();

    // Check if memory cache is valid
    const hasValidCache = memoryCache && 
      (now - memoryCache.timestamp < oneDayMs) && 
      (!memoryCache.isFallback || !apiKey);

    if (!forceRefresh && hasValidCache && memoryCache) {
      return sendJSON(res, 200, {
        rating: memoryCache.rating,
        totalReviews: memoryCache.totalReviews,
        reviews: memoryCache.reviews
      });
    }

    // Coalesce concurrent requests: if a fetch is already in progress, wait for it
    if (activeFetchPromise) {
      console.log('[Serverless] Coalescing concurrent reviews fetch request...');
      const result = await activeFetchPromise;
      return sendJSON(res, 200, {
        rating: result.rating,
        totalReviews: result.totalReviews,
        reviews: result.reviews
      });
    }

    // Start a single fetch promise
    activeFetchPromise = (async (): Promise<ReviewsCache> => {
      try {
        if (!apiKey) {
          return {
            timestamp: Date.now(),
            rating: 4.9,
            totalReviews: 850,
            reviews: FALLBACK_REVIEWS,
            isFallback: true
          };
        }

        let liveRating = 4.9;
        let liveTotal = 850;
        let rawReviews: any[] = [];
        let fetchedSuccessfully = false;

        // 1. Try Classic Place Details API with reviews_sort=newest
        try {
          console.log(`[Serverless] Fetching from Classic Google Place Details API for place ID: ${placeId}...`);
          const classicUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&reviews_sort=newest&key=${apiKey}`;
          const classicResponse = await axios.get(classicUrl, { timeout: 8000 });
          const classicData = classicResponse.data;
          
          if (classicData.status === 'OK' && classicData.result) {
            const result = classicData.result;
            liveRating = result.rating || 4.9;
            liveTotal = result.user_ratings_total || 850;
            const reviewsArr = result.reviews || [];
            
            rawReviews = reviewsArr.map((r: any, idx: number) => ({
              id: r.time ? `legacy-${r.time}-${idx}` : `legacy-${idx}`,
              author: r.author_name || 'Anonymous',
              rating: r.rating || 5,
              comment: r.text || '',
              date: r.relative_time_description || 'Recent',
              avatar: r.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              timestamp: r.time * 1000 || 0
            }));
            fetchedSuccessfully = true;
            console.log(`[Serverless] Successfully fetched ${rawReviews.length} reviews from Classic Places API.`);
          } else {
            console.warn('[Serverless] Classic Place Details API returned status:', classicData.status, classicData.error_message || '');
          }
        } catch (classicErr: any) {
          console.error('[Serverless] Error fetching from Classic Place Details API:', classicErr.message || classicErr);
        }

        // 2. Fall back to New Places API v1 if Classic didn't succeed
        if (!fetchedSuccessfully) {
          try {
            console.log(`[Serverless] Falling back to New Places API v1 for place ID: ${placeId}...`);
            const response = await axios.get(`https://places.googleapis.com/v1/places/${placeId}`, {
              headers: {
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'reviews,rating,userRatingCount'
              },
              timeout: 8000
            });

            const data = response.data;
            liveRating = data.rating || 4.9;
            liveTotal = data.userRatingCount || 850;
            const reviewsArr = data.reviews || [];

            rawReviews = reviewsArr.map((r: any, idx: number) => ({
              id: r.name || `live-${idx}`,
              author: r.authorAttribution?.displayName || 'Anonymous',
              rating: r.rating || 5,
              comment: r.text?.text || r.originalText?.text || '',
              date: r.relativePublishTimeDescription || 'Recent',
              avatar: r.authorAttribution?.photoUri || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              timestamp: r.publishTime ? new Date(r.publishTime).getTime() : 0
            }));
            fetchedSuccessfully = true;
            console.log(`[Serverless] Successfully fetched ${rawReviews.length} reviews from New Places API.`);
          } catch (v1Err: any) {
            console.error('[Serverless] Error fetching from New Places API v1:', v1Err.message || v1Err);
          }
        }

        const sortedRawReviews = [...rawReviews].sort((a: any, b: any) => b.timestamp - a.timestamp);

        let processedReviews = sortedRawReviews
          .filter((r: any) => r.rating === 5)
          .map((r: any) => ({
            id: r.id,
            author: r.author,
            rating: r.rating,
            comment: r.comment,
            date: r.date,
            avatar: r.avatar,
            timestamp: r.timestamp
          }));

        if (processedReviews.length < 5) {
          for (const fb of FALLBACK_REVIEWS) {
            if (processedReviews.length >= 5) break;
            if (!processedReviews.some((r: any) => r.author.toLowerCase() === fb.author.toLowerCase())) {
              processedReviews.push({
                id: fb.id,
                author: fb.author,
                rating: fb.rating,
                comment: fb.comment,
                date: fb.date,
                avatar: fb.avatar,
                timestamp: undefined
              });
            }
          }
        }

        processedReviews = processedReviews.slice(0, 5);

        return {
          timestamp: Date.now(),
          rating: liveRating,
          totalReviews: liveTotal,
          reviews: processedReviews,
          isFallback: !fetchedSuccessfully
        };
      } catch (err: any) {
        console.error('[Serverless] Inner fetch error:', err.message || err);
        return {
          timestamp: Date.now(),
          rating: memoryCache?.rating || 4.9,
          totalReviews: memoryCache?.totalReviews || 850,
          reviews: memoryCache?.reviews || FALLBACK_REVIEWS,
          isFallback: true
        };
      }
    })();

    try {
      const result = await activeFetchPromise;
      memoryCache = result;
      
      // Save cache file in the background (non-blocking)
      fs.writeJson(CACHE_FILE, result, { spaces: 2 }).catch(writeErr => {
        console.warn('[Serverless] Background cache write failed:', writeErr.message || writeErr);
      });

      return sendJSON(res, 200, {
        rating: result.rating,
        totalReviews: result.totalReviews,
        reviews: result.reviews
      });
    } finally {
      activeFetchPromise = null;
    }

  } catch (err: any) {
    console.error('[Serverless] Function Error:', err.message || err);
    
    // Attempt local file cache read as a fallback
    try {
      if (await fs.pathExists(CACHE_FILE)) {
        const expiredCache = await fs.readJson(CACHE_FILE);
        if (expiredCache && expiredCache.reviews) {
          return sendJSON(res, 200, {
            rating: expiredCache.rating || 4.9,
            totalReviews: expiredCache.totalReviews || 850,
            reviews: expiredCache.reviews
          });
        }
      }
    } catch (readErr) {
      // ignore
    }

    return sendJSON(res, 500, {
      rating: 4.9,
      totalReviews: 850,
      reviews: FALLBACK_REVIEWS,
      error: err.message || 'Internal Server Error'
    });
  }
}
