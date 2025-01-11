import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <JobListing />
      </div>
      <Footer />
    </>
  );
};

export default Home;
