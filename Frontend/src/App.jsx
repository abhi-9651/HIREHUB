import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing/Landing";
import SmartMatch from "./pages/SmartMatch";
import ResumeStudio from "./pages/ResumeStudio";
import CareerCopilot from "./pages/CareerCopilot";
import Profile from "./pages/Profile";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/internships" element={
        <ProtectedRoute>
          <SmartMatch />
        </ProtectedRoute>
      } />

      <Route path="/resume-studio" element={
        <ProtectedRoute>
          <ResumeStudio />
        </ProtectedRoute>
      } />

      <Route path="/career-copilot" element={
        <ProtectedRoute>
          <CareerCopilot />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;