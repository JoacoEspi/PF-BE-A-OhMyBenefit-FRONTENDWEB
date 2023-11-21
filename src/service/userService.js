import apiClient from "./apiClient.js";
import { useUserStore } from "../stores/userStore.js";

export default {
  async login(user) {
    try {
      const response = await apiClient.post("/user/login", user);
      return response.data;
    } catch (error) {
      throw error.response.message;
    }
  },
  async logout(user) {
    try {
      await apiClient.post("/user/logout", user);
    } catch (error) {
      throw "Error no se pudo cerrar sesion";
    }
  },
  async registry(user) {
    try {
      await apiClient.post("/user/registry", user);
    } catch (error) {
      throw "Error: " + error.message; // Cambio Rosa - Manejo de error
    }
  },
  async forgetPassword(elemento) {
    try {
      await apiClient.post("/user/forget-password", elemento);
    } catch (error) {
      throw "Error: " + error.response.message;
    }
  },
  async updatePassword(elemento) {
    try {
      await apiClient.post("/user/update-password", elemento);
    } catch (error) {
      throw "Error: " + error.response.message;
    }
  },
  async getAllCartsByUserId(id) {
    try {
      const token = useUserStore().getToken();
      if (!token) {
        throw "Error: No se ha encontrado un token de autenticación.";
      }
      const response = await apiClient.get(`/user/all-carts/${id}`, {
        headers: {
          "auth-token": token,
        },
      });
      //console.log(response.data)
      return response.data;
    } catch (error) {
      throw "Error: " + error.response.message;
    }
  },
  async estimateCartPrice(elemento) {
    try {
      const token = useUserStore().getToken();
      if (!token) {
        throw "Error: No se ha encontrado un token de autenticación.";
      }
      await apiClient.post(`/user/estimate-cart-price`, elemento, {
        headers: {
          "auth-token": token,
        },
      });
    } catch (error) {
      throw "Error: " + error.response.data.message;
    }
  },
  async getCartByUserIdAndBudgetId(idUser, idBudget) {
    try {
      const response = await apiClient.get(
        `/user/cart?userId=${idUser}&cartId=${idBudget}`
      );
      return response.data;
    } catch (error) {
      throw "Error: " + error.response.message;
    }
  },
  async analyzeSentiment(comentario) {
    try {
      const token = useUserStore().getToken();
      if (!token) {
        throw "Error: No se ha encontrado un token de autenticación.";
      }
      const response = await apiClient.post(
        "/user/analyze-sentiment",
        comentario,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error en analyzeSentiment:", error);
      throw error; // Asegúrate de arrojar el error para que se maneje en el componente
    }
  },
  async commentsListAll() {
    try {
      const token = useUserStore().getToken();
      if (!token) {
        throw "Error: No se ha encontrado un token de autenticación.";
      }
      const response = await apiClient.get(
        "/user/analyze-sentiment/commentsListAll",
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw "Error: " + error.response.message;
    }
  },
  async getUserIdByEmail(mail) {
    try {
      const response = await apiClient.get(`/user/find-id/${mail}`);
      return response.data;
    } catch (error) {
      throw "Error: " + error.response.message;
    }
  },
};
