import axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, companyToken } = useContext(AppContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        { title, description, location, salary, category, level },
        {
          headers: { token: companyToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setLocation("");
        setCategory("");
        setLevel("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Job Description",
      });
    }
  }, []);

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <form onSubmit={onSubmitHandler} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <div
            ref={editorRef}
            className="border rounded-lg"
            style={{ height: "200px" }}
          ></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Location
            </label>
            <select
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Job Level
            </label>
            <select
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Beginner level">Beginner level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Expert level</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="number"
            placeholder="2500"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="block px-8 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddJob;
