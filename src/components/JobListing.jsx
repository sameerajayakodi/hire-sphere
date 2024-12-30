import React, { useContext, useState } from "react";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";
const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [isFilterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => setFilterVisible(!isFilterVisible);
  const [currentpage, setCurrentPage] = useState(1);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Filter Sidebar */}
      <div
        className={`${
          isFilterVisible ? "block" : "hidden"
        } fixed inset-0 z-40 bg-white p-4 rounded-lg lg:static lg:block lg:w-1/4 lg:p-4`}
      >
        <button
          className="absolute text-gray-800 top-4 right-4 lg:hidden"
          onClick={toggleFilter}
        >
          ✖
        </button>
        {/* Current Search */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="p-2 font-medium">Current Search</h3>
              <div className="flex flex-row gap-4 p-2">
                {searchFilter.title && (
                  <span className="flex flex-row justify-center gap-2 p-2 font-medium text-gray-900 transition-colors bg-gray-200 rounded-lg cursor-pointer focus:ring-2 focus:ring-offset-2 hover:bg-gray-300">
                    {searchFilter.title}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      src={assets.cross_icon}
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="flex flex-row justify-center gap-2 p-2 font-medium text-gray-900 transition-colors bg-gray-200 rounded-lg cursor-pointer focus:ring-2 focus:ring-offset-2 hover:bg-gray-300">
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                    />
                  </span>
                )}
              </div>
            </>
          )}

        {/* Category Filter */}
        <div className="p-8 font-medium rounded-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Searched by Categories
          </h3>
          <ul className="space-y-2">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`category-${index}`}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`category-${index}`}
                  className="text-gray-700 cursor-pointer hover:text-gray-900"
                >
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className="p-8 font-medium rounded-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Searched by Location
          </h3>
          <ul className="space-y-2">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`location-${index}`}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`location-${index}`}
                  className="text-gray-700 cursor-pointer hover:text-gray-900"
                >
                  {location}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Filter Button for Mobile */}

      <div className="flex justify-end md:hidden lg:hidden ">
        <button
          onClick={toggleFilter}
          className="flex items-center p-2 px-4 mr-2 font-medium text-gray-800 bg-gray-200 rounded-lg w-fit hover:bg-gray-300 focus:ring-gray-500"
        >
          Filter
        </button>
      </div>

      {/* Job Listing */}
      <section className="w-full  text-gray-800 lg:w-3/4 lg:max-w-[calc(100%-25%)]">
        <h3 className="py-2 text-3xl font-medium" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobListing;
