import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
});

export const loginUser = async (formData) => {
  try {
    const response = await api.post("/login", formData);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await api.post("/signup", formData);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const googleAuth = async (formData) => {
  try {
    const response = await api.post("/google-auth", formData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.error ||
      "An error occurred during Google authentication"
    );
  }
};
