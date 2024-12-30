import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="mx-0 md:mx-12 lg:mx-30">
        <Navbar />
        <Hero />
        <JobListing />
      </div>
      <Footer />
    </>
  );
};

export default Home;
