import React from "react";

export const ReviewForm = ({
  reviewText,
  onReviewChange,
  onSubmit,
  onReset,
  isSubmitting,
  isValid,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Review Text */}
      <div>
        <label
          htmlFor="review"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Ulasan Anda
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="review"
          value={reviewText}
          onChange={(e) => onReviewChange(e.target.value)}
          rows={6}
          maxLength={500}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 border-[var(--color-primary)] focus:border-transparent resize-none"
          placeholder="Tulis ulasan Anda tentang produk ini... (minimal 10 karakter)"
          minLength={10}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {reviewText.length}/500 karakter
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex-1 bg-[var(--color-primary)] text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Mengirim..." : "Kirim Penilaian"}
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={isSubmitting}
          className="px-6 py-3 border border-green-300 text-green-700 rounded-lg font-medium hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  );
};
