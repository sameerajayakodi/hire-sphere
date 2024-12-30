import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets.js";
import Button from "../common/components/Button/Button";
import { AppContext } from "../context/AppContext.jsx";
const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };
  return (
    <>
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 py-20 mt-8 text-center bg-gradient-to-r from-indigo-800 via-blue-900 to-indigo-800 sm:px-8 lg:px-8">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Find Your Dream <span className="text-yellow-300">Job</span> Today
        </h1>
        <p className="max-w-2xl mt-4 text-lg text-gray-200 sm:text-xl md:text-2xl">
          Explore thousands of job opportunities tailored just for you. Your
          next career move starts here.
        </p>

        {/* Search Bar */}
        <div className="flex flex-wrap items-center justify-center w-full max-w-4xl gap-4 p-4 rounded-2xl backdrop-blur-md md:space-y-0">
          <div className="flex flex-wrap items-center justify-center w-full max-w-4xl gap-4 p-4 rounded-2xl md:space-y-0">
            <input
              ref={titleRef}
              placeholder="Search for jobs..."
              className="p-2 px-4 transition-shadow rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
            />
            <input
              ref={locationRef}
              placeholder="Location"
              className="p-2 px-4 transition-shadow rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
            />

            <Button onClick={onSearch} variant="primary">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/*trusted companies*/}
      <div className="my-10 rounded-lg shadow-lg ">
        <div className="flex flex-row gap-8 p-4 overflow-x-auto text-center sm:justify-end lg:justify-center sm:px-6 whitespace-nowrap">
          <p className="flex-shrink-0 font-medium">Trusted by</p>
          <img
            src={assets.microsoft_logo}
            alt="company_logos"
            className="flex-shrink-0 h-6"
          />
          <img
            src={assets.walmart_logo}
            alt="company_logos"
            className="flex-shrink-0 h-6"
          />
          <img
            src={assets.accenture_logo}
            alt="company_logos"
            className="flex-shrink-0 h-6"
          />
          <img
            src={assets.samsung_logo}
            alt="company_logos"
            className="flex-shrink-0 h-6"
          />
          <img
            src={assets.amazon_logo}
            alt="company_logos"
            className="flex-shrink-0 h-6"
          />
          <img
            src={assets.adobe_logo}
            alt="company_logos"
            className="flex-shrink-0 h-6"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
