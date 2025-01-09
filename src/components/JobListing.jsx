import React, { useContext, useEffect, useState } from "react";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";
const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [isFilterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => setFilterVisible(!isFilterVisible);
  const [currentpage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);
  });

  const matchesTitle = (job) =>
    searchFilter.title === "" ||
    job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
  const matchesLocation = (job) =>
    searchFilter.location === "" ||
    job.location.toLowerCase().includes(searchFilter.location.toLowerCase());
  const newFilteredJobs = jobs
    .slice()
    .reverse()
    .filter((job) => matchesTitle(job) && matchesLocation(job));
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 lg:flex-row">
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
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                  type="checkbox"
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
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                  type="checkbox"
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
          {jobs
            .slice((currentpage - 1) * 6, currentpage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* pagination */}

        {jobs.length > 0 && (
          <div className="flex flex-row items-center justify-center gap-4 p-4 my-6 ">
            <a href="">
              <img
                onClick={() => setCurrentPage(Math.max(currentpage - 1), 1)}
                src={assets.left_arrow_icon}
                alt=""
              />
            </a>
            {Array.from({ length: Math.ceil(jobs.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={` w-10 h-10  flex items-center justify-center border border-gray-300 rounded ${
                      currentpage === index + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500 "
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentpage + 1),
                    Math.ceil(jobs.length / 6)
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
