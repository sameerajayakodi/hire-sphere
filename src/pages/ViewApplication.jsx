import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import { AppContext } from "../context/AppContext";

const ViewApplication = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCompanyJobApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!companyToken || !backendUrl) {
        throw new Error("Missing authentication or configuration");
      }

      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications || []);
      } else {
        throw new Error(data.message || "Failed to fetch applications");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyJobApplications();
  }, [companyToken, backendUrl]);

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Update the local state immediately
        setApplicants((prevApplicants) =>
          prevApplicants.map((app) =>
            app._id === id ? { ...app, status } : app
          )
        );
        setOpenMenuId(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      pending: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          statusStyles[status || "pending"]
        }`}
      >
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
      </span>
    );
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={fetchCompanyJobApplications}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!applicants?.length) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">
          No applications found (Total: {applicants ? applicants.length : 0})
        </p>
      </div>
    );
  }

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
                Status/Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants
              .filter((item) => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={applicant.userId.image}
                        alt=""
                        className="object-cover w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {applicant.userId.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {applicant.jobId.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {applicant.jobId.location}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={applicant.userId.resume}
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
                    {applicant.status ? (
                      <StatusBadge status={applicant.status} />
                    ) : (
                      <div className="relative" ref={menuRef}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === index ? null : index);
                          }}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <span className="font-bold text-gray-600">...</span>
                        </button>
                        {openMenuId === index && (
                          <div className="absolute right-0 z-10 w-32 py-2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <button
                              className="w-full px-4 py-2 text-sm text-left text-green-600 hover:bg-gray-50"
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "accepted"
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50"
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "rejected"
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    )}
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
