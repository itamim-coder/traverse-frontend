"use client";

import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, addHours, format } from "date-fns";

import { useAppDispatch } from "@/redux/hooks";

import { useRouter } from "next/navigation";

import { FaLocationDot } from "react-icons/fa6";
import { useGetLocationQuery } from "@/redux/api/locationApi";
import { setSearchParameters } from "@/redux/Features/searchSlice";
const Search = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      // endDate: addHours(new Date(), 13),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { data: locations, isLoading } = useGetLocationQuery(undefined);
  // const { user } = useContext(AuthContext);
  const Locations = locations?.data.result;
  console.log(Locations)
  const handleOption = (name: any, operation: any) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const dispatch = useAppDispatch();
  // const { dispatch } = useContext(SearchContext);
  const router = useRouter();
  const handleSearch = () => {
    const selectedLocation = Locations?.find(
      (Locations) => Locations.id === destination
    );
    console.log(dates);
    console.log(selectedLocation);
    const serializedDates = dates.map((dateRange) => ({
      startDate: new Date(dateRange.startDate).toISOString(), // Remove 'Z' to keep the original time zone offset
      endDate: new Date(dateRange.endDate).toISOString(), // Remove 'Z' to keep the original time zone offset
      key: dateRange.key,
    }));
    console.log(serializedDates);
    console.log(serializedDates.length);
    if (!selectedLocation || !dates) {
      alert("Select location & Date first");
    } else {
      const serializedOptions = {
        adult: options.adult,
        children: options.children,
        room: options.room,
      };

      dispatch(
        setSearchParameters({
          destination,
          dates: serializedDates,
          options: serializedOptions,
        })
      );

      router.push(`/hotel-list/${selectedLocation.id}`);
    }
  };

  const dateRangeRef = useRef(null);
  const optionsRef = useRef(null);

  const handleDocumentClick = (e) => {
    if (
      dateRangeRef.current &&
      openDate &&
      !dateRangeRef.current.contains(e.target)
    ) {
      setOpenDate(false);
    }

    if (
      optionsRef.current &&
      openOptions &&
      !optionsRef.current.contains(e.target)
    ) {
      setOpenOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="bg-slate-200 py-5 rounded-full bg-opacity-25">
      <div className="">
        <div className="flex gap-3  items-center justify-between">
          <div className="w-full mb-4 md:mb-0">
            <div className="relative ">
              <select
                className="w-full px-4 py-3 text-white bg-gray-700 rounded-full focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(e) => setDestination(e.target.value)}
              >
                <FaLocationDot />
                <option value="">Select your destination</option>
                {Locations?.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full  mb-4 md:mb-0">
            <div className="relative">
              <span
                onClick={() => setOpenDate(!openDate)}
                className="block text-nowrap cursor-pointer text-white px-4 py-3 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
              >
                {`${format(dates[0].startDate, "MM/dd/yyyy")} - ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDates([item.selection]);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="absolute left-0 mt-2 bg-white p-2 rounded-md shadow-md z-10"
                  minDate={new Date()}
                  ref={dateRangeRef}
                />
              )}
            </div>
          </div>
          <div className="w-full  items-center ">
            <div className="relative" ref={optionsRef}>
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="block cursor-pointer text-white 
                 py-3 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
              >
                {`${options.adult} Adult · ${options.children} Children · ${options.room} Room`}
              </span>
              {openOptions && (
                <div className="absolute left-0 mt-2 bg-white p-4 rounded-md shadow-md z-10 w-full">
                  <div className="mb-4 ">
                    <span className="text-gray-700">Adult</span>
                    <div className="flex justify-around space-x-4">
                      <button
                        disabled={options.adult <= 1}
                        className="text-gray-700 hover:text-blue-500"
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <span className="text-gray-700">{options.adult}</span>
                      <button
                        className="text-gray-700 hover:text-blue-500"
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="mb-4 ">
                    <span className="text-gray-700">Children</span>
                    <div className="flex justify-around items-center space-x-4">
                      <button
                        disabled={options.children <= 0}
                        className="text-gray-700 hover:text-blue-500"
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="text-gray-700">{options.children}</span>
                      <button
                        className="text-gray-700 hover:text-blue-500"
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="">
                    <span className="text-gray-700">Room</span>
                    <div className="flex justify-around items-center space-x-4">
                      <button
                        disabled={options.room <= 1}
                        className="text-gray-700 hover:text-blue-500"
                        onClick={() => handleOption("room", "d")}
                      >
                        -
                      </button>
                      <span className="text-gray-700">{options.room}</span>
                      <button
                        className="text-gray-700 ml-2 hover:text-blue-500"
                        onClick={() => handleOption("room", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-500"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
