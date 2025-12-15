const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://cinema-backend-ohhi.onrender.com/api"
    : "http://localhost:8080/api";

export default API_BASE_URL;