import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Home from "./pages/Home";

function App() {
  const { showRecruiterLogin } = useContext(AppContext);
  return (
    <div className="mx-0 md:mx-12 lg:mx-30">
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-jobs/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}

export default App;
