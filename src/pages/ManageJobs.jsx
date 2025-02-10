import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const { backendUrl, companyToken } = useContext(AppContext);
  //Function to fetch company Job applications data

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //Function to chnage Visibility

  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, []);
  return (
    <div className="p-6">
      <div className="mb-6 overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium">#</th>
              <th className="px-6 py-4 font-medium">Job Title</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Applicants</th>
              <th className="px-6 py-4 font-medium">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {job.title}
                </td>
                <td className="px-6 py-4">{moment(job.date).format("ll")}</td>
                <td className="px-6 py-4">{job.location}</td>
                <td className="px-6 py-4">{job.applicants}</td>
                <td className="px-6 py-4">
                  <input
                    onChange={() => {
                      changeJobVisibility(job._id);
                    }}
                    checked={job.visible}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => navigate("/dashboard/add-job")}
        className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add New Job
      </button>
    </div>
  );
};

export default ManageJobs;
