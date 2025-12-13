import React, { useState, useEffect, useCallback, useRef } from "react";
import { TestimonialData } from "../../../dummy/TestimonialData";
import Card from "../../../components/common/Card";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const sliderRef = useRef(null);

  // Determine slides to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesToShow(4); // xl: 4 slides
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(3); // lg: 3 slides
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2); // md: 2 slides
      } else {
        setSlidesToShow(1); // mobile: 1 slide
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, TestimonialData.length - slidesToShow);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback(
    (index) => {
      setCurrentIndex(Math.min(index, maxIndex));
    },
    [maxIndex]
  );

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlay(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      nextSlide();
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setTouchStart(e.clientX);
    setIsAutoPlay(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }

    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      nextSlide();
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (sliderRef.current) {
        sliderRef.current.style.cursor = "grab";
      }
    }
  };

  // Auto play
  useEffect(() => {
    if (!isAutoPlay || TestimonialData.length <= slidesToShow) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide, slidesToShow]);

  // Render stars
  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`lg:text-[18px] md:text-[15px] text-[12px] ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="w-full flex flex-col gap-[15px] md:gap-[20px] my-8 md:my-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="xl:text-h4 text-h5 font-semibold text-gray-800 mb-1">
            Apa kata konsumen
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            Testimoni dari pengguna yang puas dengan layanan kami
          </p>
        </div>

        {/* Navigation Arrows - Desktop */}
        {TestimonialData.length > slidesToShow && (
          <div className="hidden md:flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-800 transition-all duration-300 flex items-center justify-center"
              aria-label="Previous"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-800 transition-all duration-300 flex items-center justify-center"
              aria-label="Next"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Slider Container */}
      <div className="relative group">
        <div
          ref={sliderRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            }}
          >
            {TestimonialData.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 px-[5px]"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <Card className="h-full lg:px-[30px] md:px-[20px] px-[20px] py-[25px] flex flex-col gap-[15px] rounded-2xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-white group/card relative overflow-hidden">
                  {/* Decorative Quote */}
                  <div className="absolute top-4 right-4 opacity-5 group-hover/card:opacity-10 transition-opacity duration-300">
                    <FaQuoteLeft className="text-6xl text-primary" />
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="md:text-h5 text-h6 font-semibold text-gray-800">
                        {review.author}
                      </p>
                      <p className="text-xs text-gray-500">Verified Customer</p>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="md:text-h6 text-[14px] leading-relaxed text-gray-600 flex-1 relative z-10 line-clamp-4">
                    "{review.review}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 relative z-10">
                    {renderStars(review.rating || 5)}
                  </div>

                  {/* Bottom Gradient Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Dots */}
        {TestimonialData.length > slidesToShow && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "bg-primary w-8 h-2"
                    : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                }`}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Swipe Hint - Mobile */}
        {TestimonialData.length > 1 && (
          <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
            <div className="flex items-center gap-2 text-gray-600 text-xs bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm animate-pulse">
              <span>←</span>
              <span>Geser</span>
              <span>→</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
