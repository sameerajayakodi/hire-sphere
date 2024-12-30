import React from "react";
import { assets } from "../assets/assets";
import Button from "../common/components/Button/Button";

const JobCard = ({ job }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Company Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
        <img
          src={assets.company_icon}
          alt="Company Icon"
          className="w-10 h-10"
        />
      </div>

      {/* Job Title */}
      <h4 className="mt-4 text-xl font-semibold text-gray-800">{job.title}</h4>

      {/* Location and Level */}
      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21c-.81 0-6-5.1-6-10.5a6 6 0 0112 0C18 15.9 12.81 21 12 21zM12 11.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />
          </svg>
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18m-6-6h12"
            />
          </svg>
          {job.level}
        </span>
      </div>

      {/* Job Description */}
      <p
        className="mt-4 text-sm text-gray-700"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <Button name="Apply now" variant="primary">
          Apply now
        </Button>
        <Button name="Learn more" variant="secondary">
          Learn more
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
