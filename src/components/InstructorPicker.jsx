import { useState } from "react";
import API from "../api/axios";

export default function InstructorPicker({ courseId, onAdded }) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=3&nat=us");
      const json = await res.json();
      const user = json.results[0];
      const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        password: "123456",
        role: "instructor",
      };
      const created = await API.post("/users", newUser);
      const courseRes = await API.get(`/courses/${courseId}`);
      const course = courseRes.data;
      const updated = {
        ...course,
        instructors: [...(course.instructors || []), created.data.id],
      };
      await API.put(`/courses/${courseId}`, updated);
      onAdded && onAdded(created.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar/inserir instrutor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleAdd} className="px-3 py-1 border rounded">
        {loading ? "Adicionando..." : "Sugerir Instrutor (randomuser.me)"}
      </button>
    </div>
  );
}
