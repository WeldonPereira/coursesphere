import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSearch = () => {
    setSearch(q);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      API.get(`/courses/${id}`),
      API.get(`/lessons`, { params: { course_id: id } }),
    ])
      .then(([courseRes, lessonsRes]) => {
        let items = lessonsRes.data;
        if (filterStatus)
          items = items.filter((l) => l.status === filterStatus);
        if (search)
          items = items.filter((l) =>
            l.title.toLowerCase().includes(search.toLowerCase())
          );
        setCourse(courseRes.data);
        setLessons(items);
      })
      .finally(() => setLoading(false));
  }, [id, search, filterStatus]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!course)
    return <div className="p-6 text-gray-700">Curso não encontrado.</div>;

  const canEditCourse = course.creator_id === user.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            {course.name}
          </h2>
          <p className="text-gray-600 mb-2">{course.description}</p>
          <div className="text-sm text-gray-500 mb-4">
            {course.start_date} até {course.end_date}
          </div>
          <div className="flex gap-3">
            {canEditCourse && (
              <Link
                to={`/courses/${id}/edit`}
                className="text-orange-600 hover:underline"
              >
                Editar Curso
              </Link>
            )}
            <Link
              to={`/courses/${id}/lessons/new`}
              className="text-blue-600 hover:underline"
            >
              Nova Aula
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            placeholder="Buscar aula..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKeyPress}
            className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Buscar
          </button>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Todos</option>
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="archived">Arquivado</option>
          </select>
        </div>

        <div className="grid gap-4">
          {lessons.map((l) => (
            <div
              key={l.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-blue-700">{l.title}</h4>
                  <p className="text-sm text-gray-500">
                    {l.status} - {l.publish_date}
                  </p>
                </div>
                <div className="flex gap-2 text-sm">
                  <a
                    href={l.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Assistir
                  </a>
                  {(l.creator_id === user.id || canEditCourse) && (
                    <Link
                      to={`/lessons/${l.id}/edit`}
                      className="text-orange-600 hover:underline"
                    >
                      Editar
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
