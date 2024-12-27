import { Route, Routes } from "react-router-dom";
import "./App.css";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Home from "./pages/Home";

function App() {
  return (
    <div className="mx-0 md:mx-12 lg:mx-30">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}

export default App;
