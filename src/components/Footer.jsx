import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";

const Footer = () => {
  return (
    <footer className="w-full py-16 text-gray-100 bg-slate-900">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h2 className="mb-6 text-2xl font-bold">Stay Connected</h2>
            <p className="mb-6 text-gray-400">
              Join our newsletter for exclusive job opportunities and expert
              career insights delivered directly to your inbox.
            </p>
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 border rounded-lg bg-slate-800 border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-3 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-400 transition duration-200 hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-400 transition duration-200 hover:text-white"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 transition duration-200 hover:text-white"
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                className="text-gray-400 transition duration-200 hover:text-white"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Trusted Companies */}
          <div className="lg:col-span-6">
            <h3 className="mb-6 text-lg font-semibold">
              Trusted By Industry Leaders
            </h3>
            <div className="grid items-center grid-cols-3 gap-8 md:grid-cols-6">
              {[
                assets.microsoft_logo,
                assets.walmart_logo,
                assets.accenture_logo,
                assets.samsung_logo,
                assets.amazon_logo,
                assets.adobe_logo,
              ].map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt="Company logo"
                  className="object-contain w-auto h-8 transition duration-200 opacity-75 hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-16 border-t border-slate-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="flex mt-4 space-x-6 md:mt-0">
              <a
                href="#"
                className="text-gray-400 transition duration-200 hover:text-white"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 transition duration-200 hover:text-white"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 transition duration-200 hover:text-white"
              >
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
