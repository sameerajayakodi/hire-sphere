import { Route, Routes } from "react-router-dom";
import "./App.css";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply-job/:id" element={<ApplyJob />} />
      <Route path="/applications" element={<Applications />} />
    </Routes>
  );
}

export default App;
