import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number; // pixel size for accuracy and responsiveness
}

export const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 14
}) => {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        if (rating >= starValue) {
          return (
            <Star 
              key={i} 
              style={{ width: size, height: size }} 
              className="text-yellow-500 fill-yellow-500 shrink-0" 
            />
          );
        } else if (rating > starValue - 1) {
          const fillPercentage = Math.round((rating - (starValue - 1)) * 100);
          return (
            <div 
              key={i} 
              className="relative inline-block shrink-0" 
              style={{ width: size, height: size }}
            >
              <Star 
                style={{ width: size, height: size }} 
                className="text-stone-200 fill-stone-200 absolute top-0 left-0" 
              />
              <div 
                className="absolute top-0 left-0 overflow-hidden" 
                style={{ width: `${fillPercentage}%`, height: size }}
              >
                <Star 
                  style={{ width: size, height: size, maxWidth: 'none' }} 
                  className="text-yellow-500 fill-yellow-500" 
                />
              </div>
            </div>
          );
        } else {
          return (
            <Star 
              key={i} 
              style={{ width: size, height: size }} 
              className="text-stone-200 fill-stone-200 shrink-0" 
            />
          );
        }
      })}
    </div>
  );
};
