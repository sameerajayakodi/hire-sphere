import kconvert from "k-convert";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Button from "../common/components/Button/Button";
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
      console.log(data[0]);
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
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="w-full px-4 mx-auto">
          <div className="bg-white rounded-lg shadow-lg ">
            <div className="p-6">
              <div className="flex items-start gap-6">
                <img
                  src={JobData.companyId.image}
                  alt={JobData.companyId.name}
                  className="object-contain w-20 h-20 p-2 rounded-lg bg-gray-50"
                />
                <div className="flex-1">
                  <h1 className="mb-4 text-2xl font-bold text-gray-900">
                    {JobData.title}
                  </h1>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <span className="flex items-center gap-2 text-gray-600">
                      <img
                        src={assets.suitcase_icon}
                        alt="Company"
                        className="w-5 h-5"
                      />
                      <span className="text-sm">{JobData.companyId.name}</span>
                    </span>
                    <span className="flex items-center gap-2 text-gray-600">
                      <img
                        src={assets.location_icon}
                        alt="Location"
                        className="w-5 h-5"
                      />
                      <span className="text-sm">{JobData.location}</span>
                    </span>
                    <span className="flex items-center gap-2 text-gray-600">
                      <img
                        src={assets.person_icon}
                        alt="Experience Level"
                        className="w-5 h-5"
                      />
                      <span className="text-sm">{JobData.level}</span>
                    </span>
                    <span className="flex items-center gap-2 text-gray-600">
                      <img
                        src={assets.money_icon}
                        alt="Salary"
                        className="w-5 h-5"
                      />
                      <span className="text-sm">
                        CTC: {kconvert.convertTo(JobData.salary)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 mt-6 border-t">
                <p className="text-sm text-gray-500">
                  Posted {moment(JobData.date).fromNow()}
                </p>
                <Button>Apply Now</Button>
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
