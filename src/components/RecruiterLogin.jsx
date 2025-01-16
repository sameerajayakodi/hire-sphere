import React, { useState } from "react";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 mx-4 transition-all duration-300 transform shadow-2xl bg-white/90 backdrop-blur-xl rounded-2xl hover:shadow-3xl">
        <button className="absolute text-sm font-medium text-gray-400 transition-colors right-6 top-6 hover:text-gray-600">
          Close
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-transparent bg-gray-800 bg-clip-text">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-gray-500">
            Login to your recruiter account
          </p>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 transition-all border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 transition-all border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:opacity-90 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign in
            </button>
          </form>
        </div>

        <div className="mt-8 text-sm text-center text-gray-500">
          <p>
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;
