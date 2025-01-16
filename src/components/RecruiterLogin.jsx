import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { useState } from "react";

const RecruiterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Card className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
        <button className="absolute text-gray-500 right-4 top-4 hover:text-gray-700">
          <X size={20} />
        </button>

        <CardHeader>
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Recruiter Login
          </h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-center text-gray-600">
          <p>
            Don&apos;t have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecruiterLogin;
