import { time } from "console";
import React from "react";

const tourTimeline = [
  {
    day: 1,
    name: "Arrival and City Tour",
    activities: [
      {
        time: "09:00",
        activity: "Departure from Origin City",
      },
      {
        time: "12:00",
        activity: "Arrival at Destination City",
      },
      {
        time: "14:00",
        activity: "Check-in at Hotel",
      },
      {
        time: "18:00",
        activity: "Guided City Tour",
      },
      {
        time: "20:00",
        activity: "Dinner at Local Restaurant",
      },
    ],
  },
  {
    day: 2,
    name: "Historical Sites and Cultural Experience",
    activities: [
      {
        time: "09:00",
        activity: "Breakfast at Hotel",
      },
      {
        time: "10:00",
        activity: "Visit to Historical Site",
      },
      {
        time: "13:00",
        activity: "Lunch at Traditional Eatery",
      },
      {
        time: "15:00",
        activity: "Shopping at Local Market",
      },
      {
        time: "19:00",
        activity: "Cultural Performance",
      },
      {
        time: "21:00",
        activity: "Free Time",
      },
    ],
  },
  {
    day: 3,
    name: "Adventure and Nature Exploration",
    activities: [
      {
        time: "08:00",
        activity: "Breakfast at Hotel",
      },
      {
        time: "09:00",
        activity: "Adventure Activity (Optional)",
      },
      {
        time: "12:00",
        activity: "Lunch",
      },
      {
        time: "14:00",
        activity: "Explore Nature Reserve",
      },
      {
        time: "18:00",
        activity: "Farewell Dinner",
      },
    ],
  },
];

const tourPlan = () => {
  return (
    <div>
      <p className="text-2xl font-semibold my-3">Itinerary</p>
      {tourTimeline.map((timeline) => (
        <div className="my-4 collapse collapse-arrow bg-base-400 shadow-sm">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium ">
            <span className="p-3 bg-orange-400 mr-4 text-white">
              Day : {timeline.day}{" "}
            </span>
            <span className="font-bold"> {timeline.name}</span>
          </div>
          <div className="collapse-content ">
            {timeline.activities.map((activity) => (
              <p>
                • {activity.time} : {activity.activity}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default tourPlan;
