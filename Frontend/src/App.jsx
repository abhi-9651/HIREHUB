import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing/Landing";
import SmartMatch from "./pages/SmartMatch";
import ResumeStudio from "./pages/ResumeStudio";
import CareerCopilot from "./pages/CareerCopilot";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/internships" element={<SmartMatch />} />

      <Route path="/resume-studio" element={<ResumeStudio />} />

      <Route path="/career-copilot" element={<CareerCopilot />} />

     <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;