import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
  };
  //fetch job data

  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  });

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
