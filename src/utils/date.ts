/**
 * Formats a Unix timestamp (in milliseconds) as a human-readable relative time string.
 * If the review is less than 7 days old, it returns "X days ago" (or hours/minutes for very recent ones).
 * Otherwise, it falls back to the clean description returned by the Google API.
 */
export function getRelativeDateString(timestamp?: number, fallbackDate: string = 'Recent'): string {
  if (!timestamp) return fallbackDate;

  const now = Date.now();
  const diffMs = now - timestamp;

  // Handle minor clock drift or invalid timestamps
  if (diffMs < 0) return 'Just now';

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    if (diffDays === 0) {
      if (diffHours < 1) {
        if (diffMinutes < 5) return 'Just now';
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }

  // Handle Google's generic strings that might be outdated in cache
  if (fallbackDate === 'in the last week') {
    return `${diffDays} days ago`;
  }

  return fallbackDate;
}
