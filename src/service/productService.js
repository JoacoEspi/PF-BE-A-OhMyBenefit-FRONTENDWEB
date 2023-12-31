import apiClient from "./apiClient.js";
import {useUserStore} from "../stores/userStore.js"

export default{
  async createProduct(producto){
    try {
      await apiClient.post("/product/create", producto);
    } catch (error) {
      throw error.response.message;
    }
  },
  async listByCategory(categoria){
    try {
      const response = await apiClient.get(`/product/list-all/${categoria}`);
      return response.data;
    } catch (error) {
      throw error.response.message;
    }
  },
  async listAllProducts(query){
    try {
      const response = await apiClient.get("/product/list-all", {
        params: query,
      });
      return response.data;
    } catch (error) {
      throw error.response.message;
    }
  },
  async createProduct(elemento) {
    try {
      await apiClient.post("/product/", elemento);
    } catch (error) {
      throw error.response.message;
    }
  },
  async deleteProductById(idProducto) {
    try {
      await apiClient.delete(`/product/${idProducto}`);
    } catch (error) {
      throw error.response.message;
    }
  },
  async getProductById(idProduct) {
    try {
      const response = await apiClient.get(`/product/${idProduct}`);
      return response.data;
    } catch (error) {
      throw error.response.message;
    }
  },
  async searchProductByName(name) {
    try {
      const response = await apiClient.get(`/product/search-name/${name}`);
      return response.data;
    } catch (error) {
      throw error.response.message;
    }
  },
  async searchProductByWord(word) {
    try {
      const response = await apiClient.get(`/product/search/${word}`);
      return response.data;
    } catch (error) {
      throw error.response.message;
    }
  },
  async detailProduct(id, idUsuario) {
    try {
      const token = useUserStore().getToken();
      if (!token) {
        throw "Error: No se ha encontrado un token de autenticación.";
      }
      const response = await apiClient.get(`/product/${id}/${idUsuario}`,{
        headers: {
            "auth-token": token,
          }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.message) {
        throw error.response.message;
      } else {
        throw error;
      }
    }
  },
  async geolocation(dataToSend) {
    try {
      const token = useUserStore().getToken();
      if (!token) {
        throw "Error: No se ha encontrado un token de autenticación.";
      }
      const response = await apiClient.post(`/product/geolocation`, dataToSend,{
        headers: {
            "auth-token": token,
          }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.message) {
        throw error.response.message;
      } else {
        throw error;
      }
    }
  },
};
