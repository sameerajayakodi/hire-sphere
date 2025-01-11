import kconvert from "k-convert";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Button from "../common/components/Button/Button";
import JobCard from "../components/JobCard";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

const ApplyJob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  return JobData ? (
    <>
      <Navbar />
      <div className="min-h-screen py-10">
        <div className="w-full px-4 mx-auto sm:px-6 lg:px-8">
          {/* Main Job Card */}
          <div className="transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-lg">
            <div className="p-8">
              <div className="flex items-start gap-8">
                <img
                  src={JobData.companyId.image}
                  alt={JobData.companyId.name}
                  className="object-contain w-24 h-24 p-3 border border-gray-100 cursor-pointer rounded-xl bg-gray-50"
                />
                <div className="flex-1">
                  <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
                    {JobData.title}
                  </h1>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <span className="flex items-center gap-3 text-gray-600 transition-colors hover:text-gray-900">
                      <img
                        src={assets.suitcase_icon}
                        alt="Company"
                        className="w-5 h-5 opacity-75"
                      />
                      <span className="text-sm font-medium">
                        {JobData.companyId.name}
                      </span>
                    </span>
                    <span className="flex items-center gap-3 text-gray-600 transition-colors hover:text-gray-900">
                      <img
                        src={assets.location_icon}
                        alt="Location"
                        className="w-5 h-5 opacity-75"
                      />
                      <span className="text-sm font-medium">
                        {JobData.location}
                      </span>
                    </span>
                    <span className="flex items-center gap-3 text-gray-600 transition-colors hover:text-gray-900">
                      <img
                        src={assets.person_icon}
                        alt="Experience Level"
                        className="w-5 h-5 opacity-75"
                      />
                      <span className="text-sm font-medium">
                        {JobData.level}
                      </span>
                    </span>
                    <span className="flex items-center gap-3 text-gray-600 transition-colors hover:text-gray-900">
                      <img
                        src={assets.money_icon}
                        alt="Salary"
                        className="w-5 h-5 opacity-75"
                      />
                      <span className="text-sm font-medium">
                        CTC: {kconvert.convertTo(JobData.salary)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Posted {moment(JobData.date).fromNow()}
                </p>
                <Button className="px-6 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>

          {/* Job Description and More Jobs Section */}
          <div className="flex flex-col gap-10 mt-10 lg:flex-row">
            {/* Left Column */}
            <div className="w-full lg:w-2/3">
              <div className="p-8 bg-white shadow-md rounded-xl">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  Job Description
                </h2>
                <div
                  className="rich-text prose prose-gray max-w-none space-y-4 
                  [&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-4 [&_p]:mb-4 
                  [&_li]:text-gray-600 [&_p]:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: JobData.description }}
                />
                <Button className="px-6 py-2 mt-8 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                  Apply Now
                </Button>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/3">
              <div className="p-8">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  More Jobs From {JobData.companyId.name}
                </h2>
                <div className="space-y-4">
                  {jobs
                    .filter(
                      (job) =>
                        job._id !== JobData._id &&
                        job.companyId._id === JobData.companyId._id
                    )
                    .slice(0, 4)
                    .map((job, index) => (
                      <JobCard key={index} job={job} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
