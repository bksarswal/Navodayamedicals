import React, { useState, useEffect } from "react";
import home2 from "../Assets/App1.jpg";
import home1 from "../Assets/App2.jpg";
import About from "./About";
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";


function Home() {
  const slides = [
    {
      image: home1,
      title: "Welcome to Navodaya Medicals ",
      description: "Your trusted partner in health and wellness",
    },
    {
      image: home2,
      title: "Quality Medicines",
      description: "We stock a wide range of high-quality medicines",
    },
    {
      image: home1,
      title: "Expert Advice",
      description: "Our pharmacists are always here to help",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8 px-4 relative">
        {/* Image Slider */}
        <div className="relative w-full h-[400px] sm:h-[300px] overflow-hidden rounded-lg shadow-lg">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => (e.target.src = "/placeholder.jpg")} // Fallback image
              />
              {/* Overlay Text */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                <h2 className="text-3xl sm:text-2xl font-bold mb-2 text-center">{slide.title}</h2>
                <p className="text-lg sm:text-sm text-center">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? slides.length - 1 : prevIndex - 1
            )
          }
        >
          <HiChevronLeft />

        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
          }
        >
          <HiChevronRight/>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <About />
    </>
  );
}

export default Home;
