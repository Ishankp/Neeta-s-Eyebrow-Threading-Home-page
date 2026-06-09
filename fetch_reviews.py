#!/usr/bin/env python3
"""
fetch_reviews.py

A production-ready Python script designed to fetch, filter, and track Google Reviews 
for a specific business using the Google Places API (v1) and an SQLite database 
for de-duplication.

This script is ideal for running as a daily cron job.
"""

import os
import sqlite3
import requests
from datetime import datetime
from typing import List, Dict, Any, Optional

DB_NAME = "review_cache.db"

def init_db(db_path: str = DB_NAME) -> None:
    """
    Initializes the SQLite database cache used for review de-duplication.
    We use the review's unique 'name' field as the PRIMARY KEY.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS processed_reviews (
            name TEXT PRIMARY KEY,
            author_name TEXT,
            rating INTEGER,
            text_content TEXT,
            publish_time TEXT,
            processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def is_review_processed(review_name: str, db_path: str = DB_NAME) -> bool:
    """
    Checks if a review has already been processed in a previous run.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT 1 FROM processed_reviews WHERE name = ?", (review_name,))
    exists = cursor.fetchone() is not None
    conn.close()
    return exists

def save_review_to_cache(review: Dict[str, Any], text_content: str, db_path: str = DB_NAME) -> None:
    """
    Saves a newly discovered review to the sqlite cache.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    author_name = review.get("authorAttribution", {}).get("displayName", "Anonymous")
    rating = review.get("rating", 0)
    publish_time = review.get("publishTime", "")
    
    try:
        cursor.execute("""
            INSERT INTO processed_reviews (name, author_name, rating, text_content, publish_time)
            VALUES (?, ?, ?, ?, ?)
        """, (review["name"], author_name, rating, text_content, publish_time))
        conn.commit()
    except sqlite3.IntegrityError:
         # Already exists, shouldn't happen due to previous query check, but safe guard.
         pass
    finally:
        conn.close()

def parse_publish_time(time_str: str) -> datetime:
    """
    Helper to safely parse RFC 3339 timestamp string into a datetime object for comparison.
    Handles 'Z' suffix variation across older/newer Python versions.
    """
    try:
        # Standardize 'Z' to UTC offset representation (+00:00)
        formatted_str = time_str.replace("Z", "+00:00")
        return datetime.fromisoformat(formatted_str)
    except Exception:
        # Lexicographical comparison string-based fallback if parsing fails
        # ISO 8601/RFC 3339 strings sort chronologically when simple strings.
        return datetime.min

def fetch_daily_reviews(place_id: str, api_key: str) -> List[Dict[str, Any]]:
    """
    Fetches daily reviews for the specified place_id, filters out duplicate/processed reviews,
    applies a length filter (>10 words), eliminates the oldest 5-star review from today's batch,
    and returns up to 5 remaining reviews.
    
    Args:
        place_id (str): The Google Place ID for the business.
        api_key (str): The Google Places API key.
        
    Returns:
        List[Dict[str, Any]]: Filtered review dict items (max 5).
    """
    # 1. API REQUEST
    # The New Places API (v1) endpoint format for details of a single place
    url = f"https://places.googleapis.com/v1/places/{place_id}"
    
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        # Field mask for fetching the reviews list with relevant nested fields
        "X-Goog-FieldMask": "reviews"
    }
    
    print(f"Fetching reviews for place_id: {place_id}...")
    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching reviews from Google Places API: {e}")
        return []

    reviews = data.get("reviews", [])
    if not reviews:
        print("No reviews returned in the API response.")
        return []

    print(f"Retrieved {len(reviews)} raw reviews from Google.")

    # Make sure SQLite cache is initialized
    init_db()

    # 2. DUPLICATE PREVENTION & 3. TEXT LENGTH FILTER
    newly_processed_today = []
    
    for review in reviews:
        review_name = review.get("name")
        if not review_name:
            continue
        
        # Check cache database; skip if seen before
        if is_review_processed(review_name):
            continue
            
        # Parse text content safely
        text_obj = review.get("text", {})
        text_content = text_obj.get("text", "") if text_obj else ""
        
        # Store in DB as processed (to prevent future processing on another day)
        save_review_to_cache(review, text_content)
        
        # Filter review by word length: strictly greater than 10 words
        # Words are calculated by splitting the text by spaces
        # Using list comprehension to handle multiple spaces cleanly
        words = [w for w in text_content.split(" ") if w]
        if len(words) > 10:
            newly_processed_today.append(review)
        else:
            print(f"Skipping review by {review.get('authorAttribution', {}).get('displayName')} (word count {len(words)} is <= 10).")

    print(f"{len(newly_processed_today)} reviews passed de-duplication and text length filtering (>10 words).")

    if not newly_processed_today:
        return []

    # 4. DROP OLDEST 5-STAR REVIEW FROM TODAY'S BATCH
    five_star_reviews = [r for r in newly_processed_today if r.get("rating") == 5]
    
    if five_star_reviews:
        # Find the oldest 5-star review based on 'publishTime'
        # Parse timestamps safely using the helper
        oldest_five_star = min(
            five_star_reviews, 
            key=lambda r: parse_publish_time(r.get("publishTime", ""))
        )
        
        old_author = oldest_five_star.get("authorAttribution", {}).get("displayName", "Unknown")
        old_time = oldest_five_star.get("publishTime", "")
        print(f"Today's oldest 5-star review is by '{old_author}' (published: {old_time}). Dropping from today's output batch.")
        
        # Remove from today's final output batch
        newly_processed_today.remove(oldest_five_star)
    else:
        print("No 5-star reviews exist in today's new batch. Skipping oldest 5-star drop.")

    # 5. OUTPUT LIMIT
    # Return at most the top 5 remaining reviews from today's batch
    final_reviews = newly_processed_today[:5]
    print(f"Returning {len(final_reviews)} reviews for today's syndication.")
    return final_reviews

# Example Usage
if __name__ == "__main__":
    # Standard fallback mock configuration for simple dry-run
    PLACE_ID = os.environ.get("GOOGLE_PLACE_ID", "ChIJSU5hTsCD54gRE0VjjSqcjxU") # Winter Garden place ID example
    API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY", "YOUR_API_KEY_HERE")
    
    if API_KEY == "YOUR_API_KEY_HERE":
        print("[Warning] No real API key configured. Setting up SQLite cache and showcasing the dry-run workflow.")
        print("Set GOOGLE_MAPS_API_KEY environment variable to test live calls.")
        
        # We can seed some dummy review data directly into the DB to demonstrate cache tracking
        init_db()
        print("SQLite Database initialized successfully.")
    else:
        # Run standard implementation
        todays_reviews = fetch_daily_reviews(PLACE_ID, API_KEY)
        for i, r in enumerate(todays_reviews, 1):
            author = r.get("authorAttribution", {}).get("displayName", "Anonymous")
            rating = r.get("rating")
            text = r.get("text", {}).get("text", "")[:100] + "..."
            print(f"[{i}] {author} ({rating} Stars): {text}")
