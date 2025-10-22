import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const schema = z.object({
  name: z.string().min(3, "Nome mínimo 3 caracteres"),
  description: z.string().max(500).optional(),
  start_date: z.string(),
  end_date: z.string(),
});

export default function CourseForm() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (id) {
      API.get(`/courses/${id}`).then((res) => {
        const c = res.data;
        setValue("name", c.name);
        setValue("description", c.description);
        setValue("start_date", c.start_date);
        setValue("end_date", c.end_date);
        setCourseData(c);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    if (new Date(data.end_date) <= new Date(data.start_date)) {
      alert("A data de término deve ser posterior à de início.");
      return;
    }

    try {
      if (id) {
        await API.put(`/courses/${id}`, { ...courseData, ...data });
      } else {
        await API.post("/courses", {
          ...data,
          creator_id: user.id,
          instructors: [user.id],
        });
      }
      navigate("/");
    } catch {
      alert("Erro ao salvar curso.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Tem certeza que deseja excluir este curso?")) return;

    try {
      await API.delete(`/courses/${id}`);
      navigate("/");
    } catch {
      alert("Erro ao excluir curso.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-20 px-6">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          {id ? "Editar Curso" : "Novo Curso"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              {...register("name")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              {...register("description")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Data início
              </label>
              <input
                type="date"
                {...register("start_date")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Data término
              </label>
              <input
                type="date"
                {...register("end_date")}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
            >
              Salvar
            </button>
            {id && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white rounded-lg py-2 hover:bg-red-700 transition"
              >
                Excluir
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
