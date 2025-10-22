import { useEffect, useState } from "react";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/courses")
      .then((res) => {
        const mine = res.data.filter(
          (c) =>
            c.creator_id === user.id || (c.instructors || []).includes(user.id)
        );
        setCourses(mine);
      })
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-blue-800 mb-4 sm:mb-0">
            Olá, {user.name.split(" ")[0]}!
          </h1>
          <Link
            to="/courses/new"
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition active:scale-[0.97]"
          >
            + Novo Curso
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow">
            <p className="text-gray-600">
              Você ainda não possui cursos. Que tal criar o primeiro?
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((c) => (
              <div
                key={c.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-medium text-blue-700 mb-2">
                  {c.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {c.description}
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  {c.start_date} até {c.end_date}
                </div>
                <div className="flex gap-3 text-sm">
                  <Link
                    to={`/courses/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Ver detalhes
                  </Link>
                  {c.creator_id === user.id && (
                    <Link
                      to={`/courses/${c.id}/edit`}
                      className="text-orange-500 hover:underline"
                    >
                      Editar
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
