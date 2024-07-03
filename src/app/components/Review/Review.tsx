import React from "react";
import ReviewSlider from "../ui/Carousel/reviewSlider";

const Review = () => {
  return (
    <div>
      <div className="text-center mt-16">
        <p>Testimonial</p>
        <p className="text-4xl font-bold">Unforgettable Travel Experiences</p>
      </div>
      <ReviewSlider />
    </div>
  );
};

export default Review;
