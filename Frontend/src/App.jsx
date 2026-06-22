import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing/Landing";
import SmartMatch from "./pages/SmartMatch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/internships" element={<SmartMatch />} />

      <Route
        path="/resume-studio"
        element={<h1 style={{ color: "white" }}>Resume Studio Coming Soon</h1>}
      />

      <Route
        path="/career-copilot"
        element={<h1 style={{ color: "white" }}>Career Copilot Coming Soon</h1>}
      />

      <Route
        path="/profile"
        element={<h1 style={{ color: "white" }}>Profile Coming Soon</h1>}
      />
    </Routes>
  );
}

export default App;