import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token); // Simpan token di localStorage
      return token;
    } catch (error) {
      throw error.response.data.msg || "Terjadi kesalahan pada server";
    }
  },

  register: async (name, email, password, confPassword) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, {
        name,
        email,
        password,
        confPassword,
      });
      return response.data.msg;
    } catch (error) {
      throw error.response.data.msg || "Terjadi kesalahan pada server";
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${apiUrl}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token"); // Hapus token dari localStorage setelah logout
      return response.data.msg;
    } catch (error) {
      throw error.response.data.msg || "Terjadi kesalahan pada server";
    }
  },

  getUserInfo: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response.data.msg || "Terjadi kesalahan pada server";
    }
  },
};

export default AuthService;
