import apiClient from "./apiClient.js";

export default{
    async login(user){
        try {
            const response = await apiClient.get("/user/login", user);
            return response.data;
        } catch (error) {
            throw  error.response.message
        }
    },
    async logout(user) {
        try {
            await apiClient.post("/user/logout", user);
        } catch (error) {
            throw "Error no se pudo cerrar sesion"
        }
    },
    async registry(user){
        try {
            await apiClient.post("/user/registry", user);
        } catch (error) {
            throw "Error: " + error.message; // Cambio Rosa - Manejo de error
        }
    }
    ,
    async forgetPassword(elemento){
        try {
            await apiClient.post("/user/forget-password", elemento)
        } catch (error) {
            throw "Error: " +  error.response.message
        }
    },
    async updatePassword(elemento){
        try {
            await apiClient.post("/user/update-password", elemento)
        } catch (error) {
            throw  "Error: " + error.response.message
        }
    },
    async getAllCartsByUserId(id){
        try {
           const response = await apiClient.get(`/user/all-carts/${id}`)
           //console.log(response.data)
            return response.data
        } catch (error) {
            throw   "Error: " + error.response.message
        }
    },
    async estimateCartPrice(elemento){
        try {
            await apiClient.post("/user/estimate-cart-price", elemento)
        } catch (error) {
            throw "Error: " + error.response.data.message
        }
    },
    async getCartByUserIdAndBudgetId(idUser, idBudget){
        try {
            const response = await apiClient.get(`/user/cart?userId=${idUser}&cartId=${idBudget}`)
            return response.data
        } catch (error) {
            throw "Error: " + error.response.message
        }
    }
}