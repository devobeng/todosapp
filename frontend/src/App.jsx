import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/authStore";

function App() {
  const { loggedIn } = useAuthStore();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={loggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={loggedIn ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
