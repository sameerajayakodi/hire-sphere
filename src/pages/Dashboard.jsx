import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-4 py-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <img
                onClick={() => navigate("/")}
                src={assets.logo}
                alt="Company Logo"
                className="w-auto h-6 transition-transform cursor-pointer sm:h-8 hover:scale-105"
              />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <p className="text-sm font-medium text-gray-900 sm:text-lg">
                Welcome Sameera
              </p>
              <div className="relative">
                <img
                  src={assets.company_icon}
                  alt="Company Icon"
                  className="w-5 h-5 transition-opacity cursor-pointer sm:w-6 sm:h-6 hover:opacity-80"
                  onClick={() => setShowLogout(!showLogout)}
                />
                {showLogout && (
                  <div className="absolute right-0 z-10 w-48 py-1 mt-2 bg-white border rounded-md shadow-lg">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2 text-sm text-gray-700 transition-colors cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setShowLogout(false);
                        }}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - width adjusts for mobile, only shows icons */}
        <div className="w-16 min-h-screen bg-white sm:w-64">
          <ul className="py-4">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center px-4 sm:px-6 py-3 transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <img src={assets.add_icon} alt="" className="w-5 h-5" />
              <p className="hidden ml-3 font-medium sm:block">Add Job</p>
            </NavLink>
            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center px-4 sm:px-6 py-3 transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <img src={assets.home_icon} alt="" className="w-5 h-5" />
              <p className="hidden ml-3 font-medium sm:block">Manage Jobs</p>
            </NavLink>
            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center px-4 sm:px-6 py-3 transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <img src={assets.person_tick_icon} alt="" className="w-5 h-5" />
              <p className="hidden ml-3 font-medium sm:block">
                View Applications
              </p>
            </NavLink>
          </ul>
        </div>

        {/* Main Content - adjusts based on sidebar width */}
        <main className="flex-1 p-4 sm:px-6 sm:py-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
