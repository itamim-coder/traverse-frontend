"use client";
import { useCallback, useEffect, useState } from "react";

export const WhyUsSlider = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  // The slider images array
  const sliderImages = [
    "https://travosy.vercel.app/static/media/1.f66fa632eaccba2c9d8f.jpg",
    "https://travosy.vercel.app/static/media/3.86227d75d7bec8381222.jpg",
    "https://envato.bdevs.net/tourigo/wp-content/uploads/2024/04/blog-image-2.png",
  ];
  const prevSlider = () => {
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? sliderImages.length - 1 : currentSlider - 1
    );
  };
  const nextSlider = useCallback(() => {
    setCurrentSlider((currentSlider) =>
      currentSlider === sliderImages.length - 1 ? 0 : currentSlider + 1
    );
  }, [sliderImages.length]);

  // if you don't want to change the slider automatically then you can just remove the useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider, currentSlider]);

  return (
    <div className=" flex items-center justify-evenly mx-auto w-fit">
      {/* arrow left */}
      <button onClick={prevSlider} className="h-6 w-6">
        <svg
          viewBox="0 0 1024 1024"
          //   className="icon h-4 w-4 md:h-6 md:w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="rgb(220, 128, 82)"
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </g>
        </svg>
      </button>
      {/* arrow right */}
      <div className="w-2/3  max-w-72 overflow-hidden">
        {/* slider container */}
        <div
          className="flex transform-gpu duration-500 ease-linear"
          style={{ transform: `translateX(-${currentSlider * 100}%)` }}
        >
          {/* sliders */}
          {sliderImages.map((slide, inx) => (
            <img
              // width={500}
              // height={500}
              key={inx}
              src={slide}
              className="mx-[2.5%] min-w-[95%] rounded-2xl border-8 border-transparent object-cover"
              alt={`Slider - ${inx + 1}`}
            />
          ))}
        </div>
      </div>
      <button
        onClick={nextSlider}
        className="
         
        
     
         h-6 w-6 
          "
      >
        <svg
          viewBox="0 0 1024 1024"
          className="icon h-4 w-4 md:h-6 md:w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          transform="rotate(180)"
        >
          <g strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="rgb(220, 128, 82)"
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
};
