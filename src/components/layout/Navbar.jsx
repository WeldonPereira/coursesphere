import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-blue-700">
          CourseSphere
        </Link>

        <div className="flex items-center gap-5">
          {user && (
            <>
              <span className="text-gray-700 text-sm">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-blue-600 hover:underline text-sm"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
