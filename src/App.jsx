import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/layout/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import CourseForm from "./pages/CourseForm";
import LessonForm from "./pages/LessonForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />{" "}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses/new" element={<CourseForm />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/courses/:id/edit" element={<CourseForm />} />
            <Route
              path="/courses/:courseId/lessons/new"
              element={<LessonForm />}
            />
            <Route path="/lessons/:id/edit" element={<LessonForm />} />
          </Route>
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route
            path="*"
            element={<div className="p-6">Página não encontrada</div>}
          />
        </Routes>
        <ToastContainer position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
