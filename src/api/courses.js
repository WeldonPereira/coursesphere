import API from "./axios";

export const getCourses = (params = {}) => API.get("/courses", { params });
export const getCourse = (id) => API.get(`/courses/${id}`);
export const createCourse = (data) => API.post("/courses", data);
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

export const getLessons = (params = {}) => API.get("/lessons", { params });
export const getLesson = (id) => API.get(`/lessons/${id}`);
export const createLesson = (data) => API.post("/lessons", data);
export const updateLesson = (id, data) => API.put(`/lessons/${id}`, data);
export const deleteLesson = (id) => API.delete(`/lessons/${id}`);

export const getUsers = (params = {}) => API.get("/users", { params });
