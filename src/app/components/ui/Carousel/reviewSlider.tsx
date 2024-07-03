"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
// or only core styles
import "@splidejs/splide/css/core";

const reviews = [
  {
    userName: "John Doe",
    userImage:
      "https://jufailitech.com/envatoitems/travilo/html/assets/images/resources/thumbnails/testi-5.jpg",
    reviewText:
      "Amazing tour! The guide was knowledgeable and the scenery was breathtaking. Highly recommend!",
    rating: 5,
    reviewDate: "2024-05-15",
  },
  {
    userName: "Jane Smith",
    userImage:
      "https://jufailitech.com/envatoitems/travilo/html/assets/images/resources/thumbnails/testi-5.jpg",
    reviewText:
      "The tour was good but a bit rushed. Would have liked more time at each stop.",
    rating: 4,
    reviewDate: "2024-04-20",
  },
  {
    userName: "Alice Johnson",
    userImage:
      "https://jufailitech.com/envatoitems/travilo/html/assets/images/resources/thumbnails/testi-5.jpg",
    reviewText:
      "Not worth the money. The guide was unprofessional and the bus was uncomfortable.",
    rating: 2,
    reviewDate: "2024-03-30",
  },
  {
    userName: "Bob Lee",
    userImage:
      "https://jufailitech.com/envatoitems/travilo/html/assets/images/resources/thumbnails/testi-5.jpg",
    reviewText:
      "Great experience! Loved the food and the cultural insights provided by the guide.",
    rating: 5,
    reviewDate: "2024-02-18",
  },
  {
    userName: "Sara Connor",
    userImage:
      "https://jufailitech.com/envatoitems/travilo/html/assets/images/resources/thumbnails/testi-5.jpg",
    reviewText:
      "The tour was okay. Some parts were interesting, but overall it felt too commercialized.",
    rating: 3,
    reviewDate: "2024-01-10",
  },
];

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-orange-500">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={i}>★</span>
        ))}
      {halfStar && <span>☆</span>}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <span key={i + fullStars + 1}>☆</span>
        ))}
    </div>
  );
};

const ReviewSlider = () => {
  return (
    <div className="p-24">
      <Splide
        options={{
          type: "loop",
          rewind: true,
          autoplay: true,
          arrows: false,
          perPage: 3,
          gap: 25,
          pagination: false,
        }}
        aria-label="Tour Reviews"
      >
        {reviews.map((review, index) => (
          <SplideSlide key={index}>
            <div className="bg-white p-8 h-80 flex flex-col justify-between shadow-lg rounded-lg">
              <p className="text-center overflow-hidden text-ellipsis line-clamp-3">
                {review.reviewText}
              </p>
              <div className="flex justify-between my-4">
                <div>{getStars(review.rating)}</div>
                <p>{review.reviewDate}</p>
              </div>
              <div className="grid justify-items-center">
                <div className="avatar">
                  <div className="w-20 rounded-xl">
                    <img src={review.userImage} alt={review.userName} />
                  </div>
                </div>
                <p className="text-lg font-semibold">{review.userName}</p>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default ReviewSlider;
