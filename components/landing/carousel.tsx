"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

const slides: CarouselSlide[] = [
  {
    image: "/assets/slide-end2end_channel.png",
    title: "End2End Channel",
    description:
      "Connect with new and existing customers, link your food business with reliable logistics and gain access to suppliers for quality goods at competitive prices.",
  },
  {
    image: "/assets/slide-easy_to_use.png",
    title: "Easy To Use",
    description:
      "Automate your restaurant operations with the very minimal time spent on training your staff. Our interactive interface makes it easy to navigate our platform with little support.",
  },
  {
    image: "/assets/slide-elastic_solution.png",
    title: "Elastic Solution",
    description:
      "Increase your access to wide range of features that allow you to process orders, track inventory, get supplies, budget expenses, and make business decisions with real-time data.",
  },
];

const FeatureCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const slideInterval = useRef<NodeJS.Timeout>();

  const startAutoSlide = useCallback(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, []);

  const resetAutoSlide = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    startAutoSlide();
  }, [startAutoSlide]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [startAutoSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const swipeThreshold = 50;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        // Swipe left
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        // Swipe right
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
      resetAutoSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="relative w-full px-6 py-16 container">
      <div className="relative overflow-hidden mx-auto bg-white rounded-md">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="relative w-full aspect-video">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <div className="text-center px-6 pb-8">
                <h2 className="text-2xl font-semibold mb-4">{slide.title}</h2>
                <p className="text-gray-600">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                resetAutoSlide();
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-secondary" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCarousel;
