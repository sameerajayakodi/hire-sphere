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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-4 text-center bg-gray-300 sm:px-8 lg:px-8">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Find Your Dream <span className="text-blue-600">Job</span> Today
        </h1>
        <p className="max-w-2xl mt-4 text-lg text-gray-600 sm:text-xl md:text-2xl">
          Explore thousands of job opportunities tailored just for you. Your
          next career move starts here.
        </p>

        {/* Search Bar */}
        <div className="flex flex-wrap items-center justify-center w-full max-w-4xl gap-4 p-4 mt-12 rounded-2xl md:space-y-0">
          <input
            ref={titleRef}
            placeholder="Search for jobs..."
            className="p-2 px-4 font-bold transition-shadow rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
          />
          <input
            ref={locationRef}
            placeholder="Location"
            className="p-2 px-4 font-bold transition-shadow rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
          />

          <Button onClick={onSearch} variant="primary">
            Search
          </Button>
        </div>
      </div>

      {/*trusted companies*/}
      <div className="my-4">
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