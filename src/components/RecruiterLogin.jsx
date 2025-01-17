import React, { useState } from "react";
import { assets } from "../assets/assets";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  const toggleState = () => {
    setState(state === "Login" ? "Signup" : "Login");
    // Clear form fields when switching states
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 mx-4 transition-all duration-300 shadow-lg bg-white/90 backdrop-blur-xl rounded-2xl hover:shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Recruiter {state}
            </h1>
            <p className="text-gray-600">
              {state === "Login"
                ? "Welcome back! Please sign in to continue"
                : "Create an account to get started"}
            </p>
          </div>

          <div className="space-y-4">
            {state !== "Login" && (
              <div className="relative">
                <img
                  src={assets.person_icon}
                  alt=""
                  className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
                />
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Company Name"
                  value={name}
                  required
                  className="w-full px-10 py-3 border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-gray-400"
                />
              </div>
            )}

            <div className="relative">
              <img
                src={assets.email_icon}
                alt=""
                className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Id"
                value={email}
                required
                className="w-full px-10 py-3 border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-gray-400"
              />
            </div>

            <div className="relative">
              <img
                src={assets.lock_icon}
                alt=""
                className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                value={password}
                required
                className="w-full px-10 py-3 border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 font-medium text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg active:transform active:scale-95"
          >
            {state === "Login" ? "Login" : "Create Account"}
          </button>

          <div className="text-sm text-center">
            <p className="text-gray-600">
              <button
                type="button"
                onClick={toggleState}
                className="font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
              >
                {state === "Login" ? (
                  <p>
                    Don&apos;t have an account?{" "}
                    <span
                      onClick={() => setState("Sign Up")}
                      className="font-semibold"
                    >
                      Signup
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span
                      onClick={() => setState("Login")}
                      className="font-semibold"
                    >
                      Login
                    </span>
                  </p>
                )}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterLogin;
