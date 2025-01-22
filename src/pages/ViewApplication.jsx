import React, { useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplication = () => {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">
                #
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">
                User Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">
                Job Title
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">
                Location
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">
                Resume
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={applicant.imgSrc}
                      alt=""
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {applicant.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {applicant.jobTitle}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {applicant.location}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={applicant.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    Resume
                    <img
                      src={assets.resume_download_icon}
                      alt="Download Resume"
                      className="w-4 h-4"
                    />
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === index ? null : index)
                      }
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      ...
                    </button>
                    {openMenuId === index && (
                      <div className="absolute right-0 w-32 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <button
                          className="w-full px-4 py-2 text-sm text-left text-green-600 hover:bg-gray-50"
                          onClick={() => setOpenMenuId(null)}
                        >
                          Accept
                        </button>
                        <button
                          className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50"
                          onClick={() => setOpenMenuId(null)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplication;
