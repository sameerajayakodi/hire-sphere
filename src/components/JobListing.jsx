import React, { useContext } from "react";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);
  return (
    <div className="flex flex-row">
      {/*side bar*/}
      <div className="hidden w-1/4 p-4 bg-gray-100 lg:block">
        {/*search filter for hero component*/}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="p-2 font-medium">Current Search</h3>
              <div className="flex flex-row gap-4 p-2">
                {searchFilter.title && (
                  <span className="flex flex-row justify-center gap-2 p-2 font-medium text-gray-900 transition-colors bg-gray-200 rounded-lg cursor-pointer focus:ring-2 focus:ring-offset-2 hover:bg-gray-300 ">
                    {searchFilter.title}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      src={assets.cross_icon}
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="flex flex-row justify-center gap-2 p-2 font-medium text-gray-900 transition-colors bg-gray-200 rounded-lg cursor-pointer focus:ring-2 focus:ring-offset-2 hover:bg-gray-300 ">
                    {searchFilter.location}
                    <img
                      onClick={(e) =>
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
        {/*category filter*/}

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
        {/*Location filter*/}

        <div className="p-8 font-medium rounded-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Searched by Categories
          </h3>
          <ul className="space-y-2">
            {JobLocations.map((location, index) => (
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
                  {location}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
