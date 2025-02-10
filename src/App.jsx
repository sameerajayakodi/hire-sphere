import "quill/dist/quill.snow.css";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import AddJob from "./pages/AddJob";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ManageJobs from "./pages/ManageJobs";
import ViewApplication from "./pages/ViewApplication";
function App() {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  return (
    <div className="mx-0 md:mx-12 lg:mx-30">
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-jobs/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewApplication />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
