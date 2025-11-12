import React, { useState } from "react";
import { Star, Package, ThumbsUp, ThumbsDown } from "lucide-react";

const ReviewPage = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const product = {
    id: 1,
    name: "Kuli Bangunan",
    image: "https://placehold.co/300x300/22c55e/ffffff?text=Foto Nguli",
    brand: "Dwi12",
    price: 200000,
    category: "Bangunan",
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRating > 0 && reviewText.trim() && userName.trim()) {
      setIsSubmitted(true);
      // In a real app, you would send this data to your backend
      console.log({
        product: product.name,
        rating: selectedRating,
        review: reviewText,
        user: userName,
      });
    }
  };

  const resetForm = () => {
    setSelectedRating(0);
    setReviewText("");
    setUserName("");
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-6 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <ThumbsUp className="w-8 h-8" />
              Penilaian Jasa
            </h1>
            <p className="text-white mt-2">
              Bantu kami meningkatkan kualitas jasa dengan memberikan penilaian
              Anda
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Terima Kasih!
              </h2>
              <p className="text-gray-600 mb-6">
                Penilaian Anda untuk{" "}
                <span className="font-semibold text-[var(--color-primary)]">
                  {product.name}
                </span>{" "}
                telah berhasil dikirim.
              </p>
              <button
                onClick={resetForm}
                className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Beri Penilaian Lain
              </button>
            </div>
          ) : (
            <div className="p-6">
              {/* Product Info */}
              <div className="flex flex-col md:flex-row gap-6 mb-8 p-4 bg-[#f2fcf4] rounded-xl">
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-1">Brand: {product.brand}</p>
                  <p className="text-gray-600 mb-1">
                    Kategori: {product.category}
                  </p>
                  <p className="text-lg font-semibold text-[var(--color-primary)]">
                    Rp {product.price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Rating Section */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Berikan Penilaian Anda
                </label>
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          star <= (hoverRating || selectedRating)
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

              {/* Review Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Review Text */}
                <div>
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ulasan Anda
                  </label>
                  <textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={6}
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
                    disabled={
                      !selectedRating || !reviewText.trim() || !userName.trim()
                    }
                    className="flex-1 bg-[var] text-white py-3 px-6 rounded-lg font-medium hover:bg-[var(--color-primary)] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Kirim Penilaian
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRating(0);
                      setReviewText("");
                      setUserName("");
                    }}
                    className="px-6 py-3 border border-green-300 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Footer */}
          <div className="bg-green-50 px-6 py-4 text-center text-sm text-gray-600 border-t">
            <p>
              Penilaian Anda sangat berharga untuk membantu kami meningkatkan
              kualitas jasa dan layanan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
