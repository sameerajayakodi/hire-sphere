import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/components/Button/Button";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <div>
        <nav className="w-full px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <svg
                  className="w-8 h-8 text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
              ></svg>
              <span className="text-xl font-bold text-gray-800">HireSpare</span>
            </div>

            {/* Hamburger Menu for Mobile */}
            <button
                className="block lg:hidden p-2 text-gray-700 rounded-md focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            {/* Links Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                  <>
                    <Button variant="secondary">
                      <Link to={"/applications"} className="font-medium">
                        Applied Jobs
                      </Link>
                    </Button>
                    <p className="text-sm text-gray-800">
                      Hi, {user.firstName + " " + user.lastName}
                    </p>
                    <UserButton className="mt-2" />
                  </>
              ) : (
                  <>
                    <Button variant="secondary">Recruiter Login</Button>
                    <Button onClick={(e) => openSignIn()}>Login</Button>
                  </>
              )}
            </div>
          </div>
        </nav>

        {/* Sidebar for Mobile */}
        {isMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="absolute top-0 left-0 w-2/3 h-full bg-white shadow-lg">
                <div className="p-4">
                  <button
                      className="text-gray-700 focus:outline-none"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="mt-8 space-y-4">
                    {user ? (
                        <>
                          <Link to={"/applications"} className="block text-lg">
                            Applied Jobs
                          </Link>
                          <p className="text-sm text-gray-800">
                            Hi, {user.firstName + " " + user.lastName}
                          </p>
                          <UserButton className="mt-2" />
                        </>
                    ) : (
                        <>
                          <Button variant="secondary">Recruiter Login</Button>
                          <Button onClick={(e) => openSignIn()}>Login</Button>
                        </>
                    )}
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Navbar;
