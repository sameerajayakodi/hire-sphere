import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    imagePreview: null,
  });
  const [errors, setErrors] = useState({});
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const validateForm = () => {
    const newErrors = {};

    if (state === "Signup") {
      if (!formData.name.trim()) {
        newErrors.name = "Company name is required";
      }

      if (!formData.image && showImageUpload) {
        newErrors.image = "Company logo is required";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
        // Clear image error if exists
        if (errors.image) {
          setErrors((prev) => ({
            ...prev,
            image: "",
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSuccessfulAuth = (data) => {
    if (data.success) {
      setCompanyData(data.company);
      setCompanyToken(data.token);
      localStorage.setItem("companyToken", data.token);

      // Close the form first
      setShowRecruiterLogin(false);

      // Then navigate and show success message
      navigate("/dashboard");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    if (state === "Signup" && !showImageUpload) {
      setShowImageUpload(true);
      return;
    }

    setIsSubmitting(true);

    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, {
          email: formData.email,
          password: formData.password,
        });

        handleSuccessfulAuth(data);
      } else {
        const formPayload = new FormData();
        formPayload.append("name", formData.name);
        formPayload.append("email", formData.email);
        formPayload.append("password", formData.password);
        if (formData.image) {
          formPayload.append("image", formData.image);
        }

        const { data } = await axios.post(
          `${backendUrl}/api/company/register`,
          formPayload
        );

        handleSuccessfulAuth(data);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleState = () => {
    setState(state === "Login" ? "Signup" : "Login");
    setShowImageUpload(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      image: null,
      imagePreview: null,
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 mx-4 transition-all duration-300 shadow-lg bg-white/90 backdrop-blur-xl rounded-2xl hover:shadow-xl">
        {showImageUpload ? (
          <div className="space-y-6">
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
                  {formData.imagePreview ? (
                    <div className="relative mb-4">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="object-cover w-32 h-32 rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            image: null,
                            imagePreview: null,
                          }));
                        }}
                        className="absolute flex items-center justify-center w-6 h-6 p-1 text-sm text-white transition-colors bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <img
                      src={assets.upload_icon}
                      alt=""
                      className="w-12 h-12 mb-2 text-gray-400"
                    />
                  )}
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 text-sm text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100">
                      {formData.imagePreview ? "Change File" : "Choose File"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {errors.image && (
                    <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onSubmitHandler}
              disabled={isSubmitting}
              className="w-full px-4 py-3 font-medium text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Complete Registration"}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmitHandler} className="space-y-6">
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
                <div className="space-y-1">
                  <div className="relative">
                    <img
                      src={assets.person_icon}
                      alt=""
                      className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
                    />
                    <input
                      name="name"
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Company Name"
                      value={formData.name}
                      className={`w-full px-10 py-3 border ${
                        errors.name ? "border-red-500" : "border-gray-200"
                      } bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-gray-400`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              )}

              <div className="space-y-1">
                <div className="relative">
                  <img
                    src={assets.email_icon}
                    alt=""
                    className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
                  />
                  <input
                    name="email"
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Email Id"
                    value={formData.email}
                    className={`w-full px-10 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-gray-400`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <img
                    src={assets.lock_icon}
                    alt=""
                    className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
                  />
                  <input
                    name="password"
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    className={`w-full px-10 py-3 border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-gray-400`}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 font-medium text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? state === "Login"
                  ? "Logging in..."
                  : "Creating Account..."
                : state === "Login"
                ? "Login"
                : "Create Account"}
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
