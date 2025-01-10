import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
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
      <div>
        <div>
          <div>
            <div>
              <img src={JobData.companyId.image} />
              <div>
                <h1>{JobData.title}</h1>
                <div>
                  <span>
                    <img src={assets.suitcase_icon} />
                    {JobData.companyId.name}
                  </span>
                  <span>
                    <img src={assets.location_icon} />
                    {JobData.location}
                  </span>
                  <span>
                    <img src={assets.person_icon} />
                    {JobData.level}
                  </span>
                  <span>
                    <img src={assets.money_icon} />
                    CTC : {JobData.salary}
                  </span>
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
