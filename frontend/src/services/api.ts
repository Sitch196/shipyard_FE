import { LoginValues, RegisterValues, AuthResponse, Ship } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  auth: {
    login: async (values: LoginValues): Promise<AuthResponse> => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      return response.json();
    },

    register: async (values: RegisterValues): Promise<AuthResponse> => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      return response.json();
    },
  },

  ships: {
    getAll: async (): Promise<Ship[]> => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/ships`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch ships");
      }

      return response.json();
    },
  },
};
