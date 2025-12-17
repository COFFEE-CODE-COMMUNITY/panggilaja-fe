import React, { useState } from "react";
import { Star } from "lucide-react";

export const RatingInput = ({ selectedRating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="mb-8">
      <label className="block text-lg font-semibold text-gray-800 mb-4">
        Berikan Penilaian Anda
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
            className="transition-transform hover:scale-110 focus:outline-none"
            aria-label={`Rating ${star} bintang`}
          >
            <Star
              className={`w-12 h-12 cursor-pointer ${star <= (hoverRating || selectedRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
                }`}
            />
          </button>
        ))}
      </div>
      <p className="text-gray-600 text-sm">
        {selectedRating > 0
          ? `Anda memberi penilaian ${selectedRating} bintang`
          : "Klik bintang untuk memberi penilaian"}
      </p>
    </div>
  );
};
