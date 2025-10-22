import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const schema = z.object({
  title: z.string().min(1, "Obrigatório"),
  status: z.enum(["draft", "published", "archived"]),
  publish_date: z.string(),
  video_url: z.string().url("URL inválida"),
});

export default function LessonForm() {
  const { user } = useAuth();
  const { courseId, id } = useParams();
  const navigate = useNavigate();

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
      API.get(`/lessons/${id}`).then((res) => {
        const l = res.data;
        setValue("title", l.title);
        setValue("status", l.status);
        setValue("publish_date", l.publish_date);
        setValue("video_url", l.video_url);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await API.put(`/lessons/${id}`, data);
      } else {
        await API.post("/lessons", {
          ...data,
          course_id: Number(courseId),
          creator_id: user.id,
        });
      }
      navigate(`/courses/${courseId}`);
    } catch {
      alert("Erro ao salvar aula.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-20 px-6">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          {id ? "Editar Aula" : "Nova Aula"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              {...register("title")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              {...register("status")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Data de Publicação
            </label>
            <input
              type="date"
              {...register("publish_date")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Link do Vídeo
            </label>
            <input
              {...register("video_url")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
