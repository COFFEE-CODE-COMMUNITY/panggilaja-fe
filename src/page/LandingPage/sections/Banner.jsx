import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Bannerr from "../../../assets/Bannerr.jpeg";
import { MdLocationOn } from "react-icons/md";
import { selectSeeAddress } from "../../../features/userSlice";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../features/authSlice";

const Banner = () => {
  // Sample banner data - you can replace these with your actual images
  const banners = [
    {
      id: 1,
      image: Bannerr,
      title: "Promo Spesial Hari Ini",
      description: "Diskon hingga 50% untuk semua jasa",
    },
    {
      id: 2,
      image: Bannerr, // Replace with your second banner image
      title: "Jasa Terpercaya #1",
      description: "Ribuan mitra siap melayani Anda",
    },
    {
      id: 3,
      image: Bannerr, // Replace with your third banner image
      title: "Gratis Ongkir",
      description: "Untuk pemesanan pertama Anda",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const address = useSelector(selectSeeAddress)
  const token = useSelector(selectAccessToken)

  // Auto slide function
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  }, [banners.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Touch handlers for mobile swipe
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

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);

    // Resume autoplay after 3 seconds
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  // Mouse drag handlers for desktop
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

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);

    // Resume autoplay after 3 seconds
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

  // Auto play effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide]);

  return (
    <div className="w-full md:mb-0 relative group">
      {token && (
        <div className='w-full flex justify-end mb-2'>
          <div className='flex items-center gap-1'>
              <MdLocationOn className='text-gray-500'/>
              <p className='font-light sm:text-h5 text-h6'>{address?.data?.kecamatan}</p>
          </div>
        </div>
      )}
      {/* Main Banner Container */}
      <div
        ref={sliderRef}
        className="relative w-full md:h-[500px] h-[200px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="min-w-full h-full relative"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

              {/* Banner Content - Optional */}
              <div className="text-white z-10 md:block pointer-events-none mt-auto absolute bottom-0 p-4 mb-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold md:mb-2 mb-1">
                    {banner.title}
                </h2>
                <p className="text-md md:text-lg lg:text-xl opacity-90">
                    {banner.description}
                </p>
            </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Desktop only */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block z-20 shadow-lg"
          aria-label="Previous slide"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block z-20 shadow-lg"
          aria-label="Next slide"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "bg-white w-8 h-2"
                  : "bg-white/50 hover:bg-white/75 w-2 h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
