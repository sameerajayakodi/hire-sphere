import moment from "moment";
import React, { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import Button from "../common/components/Button/Button";
import Navbar from "../components/Navbar";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold text-gray-800">Your Resume</h2>

        <div className="flex gap-2 mt-3 mb-6">
          {isEdit ? (
            <div className="w-full max-w-md">
              <label
                htmlFor="resumeUpload"
                className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    src={assets.profile_upload_icon}
                    alt="Upload icon"
                    className="w-8 h-8 mb-3"
                  />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => setIsEdit(false)}
                  variant="secondary"
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    setIsEdit(false);
                  }}
                  className="w-full"
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a
                href=""
                className="flex items-center gap-2 px-4 py-2 text-blue-600 transition-colors duration-200 bg-blue-100 rounded-lg hover:bg-blue-200"
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
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Resume
              </a>
              <Button
                onClick={() => {
                  setIsEdit(true);
                }}
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
        <h2>Jobs Applied</h2>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => {
              // eslint-disable-next-line no-constant-condition
              true ? (
                <tr key={index}>
                  <td>
                    <img src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{moment(job.date).format("ll")}</td>
                  <td></td>
                </tr>
              ) : null;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Applications;
