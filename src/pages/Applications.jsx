import moment from "moment";
import React, { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import Button from "../common/components/Button/Button";
import Navbar from "../components/Navbar";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container px-4 py-10 mx-auto 2xl:px-20">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Your Resume
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            {isEdit ? (
              <div className="w-full max-w-md">
                <label
                  htmlFor="resumeUpload"
                  className="flex flex-col items-center justify-center w-full h-40 px-4 transition-all duration-200 bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <img
                      src={assets.profile_upload_icon}
                      alt="Upload icon"
                      className="w-12 h-12 mb-4 text-gray-400"
                    />
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold text-blue-600">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                  </div>
                  <input
                    id="resumeUpload"
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={(e) => {
                      setResume(e.target.files[0]);
                    }}
                  />
                </label>

                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={() => setIsEdit(false)}
                    variant="secondary"
                    className="w-full py-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsEdit(false)}
                    className="w-full py-2"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button>
                  {" "}
                  <a href="" className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    Resume
                  </a>
                </Button>

                <Button
                  onClick={() => setIsEdit(true)}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </Button>
              </div>
            )}
          </div>

          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Jobs Applied
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Company
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobsApplied.map((job, index) => (
                  <tr
                    key={index}
                    className="transition-colors duration-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="w-8 h-8 mr-3 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {job.company}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {moment(job.date).format("ll")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          job.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }
                        ${
                          job.status.toLowerCase() === "rejected"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                        ${
                          job.status.toLowerCase() === "accepted"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          job.status.toLowerCase() === "in progress"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }
                      `}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
