import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center bg-white p-10 rounded-2xl shadow">
        <h1 className="text-3xl font-semibold text-red-600 mb-3">
          Acesso Negado
        </h1>
        <p className="text-gray-600 mb-6">
          Você não possui permissão para visualizar esta página.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
