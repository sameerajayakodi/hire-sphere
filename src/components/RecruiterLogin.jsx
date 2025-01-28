import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const RecruiterLogin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

 
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "Login") {
      console.log("Login attempted with:", { email, password });
    } else {
      setShowImageUpload(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleState = () => {
    setState(state === "Login" ? "Signup" : "Login");
    setShowImageUpload(false);
    setName("");
    setEmail("");
    setPassword("");
    setImage(null);
    setImagePreview(null);
  };

  // If modal is closed, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-sm"
      onClick={(e) => {
        // Close when clicking the backdrop
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="relative w-full max-w-md p-8 mx-4 transition-all duration-300 shadow-lg bg-white/90 backdrop-blur-xl rounded-2xl hover:shadow-xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute flex items-center justify-center w-8 h-8 transition-colors rounded-full top-4 right-4 hover:bg-gray-100"
          aria-label="Close"
        >
          <span className="text-2xl font-medium leading-none text-gray-500">
            ×
          </span>
        </button>

        {showImageUpload ? (
          <>
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Upload Company Logo
              </h1>
              <p className="mb-6 text-gray-600">
                Please upload your company logo to complete registration
              </p>
            </div>

            <div className="p-6 text-center border-2 border-gray-300 border-dashed rounded-xl">
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  {imagePreview ? (
                    <div className="relative mb-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-32 h-32 rounded-lg shadow-md"
                      />
                      <button
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute flex items-center justify-center w-6 h-6 p-1 text-sm text-white transition-colors bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <img
                      src={assets.upload_icon || assets.person_icon}
                      alt=""
                      className="w-12 h-12 mb-2 text-gray-400"
                    />
                  )}
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 text-sm text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100">
                      {imagePreview ? "Change File" : "Choose File"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {image && !imagePreview && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected: {image.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                console.log("Final submission with:", {
                  name,
                  email,
                  password,
                  image: image,
                });
                handleClose();
              }}
              className="w-full px-4 py-3 mt-6 font-medium text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg active:transform active:scale-95"
            >
              Complete Registration
            </button>
          </>
        ) : (
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
                {state === "Login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleState}
                  className="font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
                >
                  {state === "Login" ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecruiterLogin;
