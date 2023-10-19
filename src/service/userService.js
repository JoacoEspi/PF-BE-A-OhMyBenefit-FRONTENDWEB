import apiClient from "./apiClient.js";

export default{
    async login(elemento){
        try {
            const response = await apiClient.get("/user/login", elemento);
            return response.data;
        } catch (error) {
            throw "Error: " + error.response.data.message
        }
    },
    async logout(elemento) {
        try {
            await apiClient.post("/user/logout", elemento);
        } catch (error) {
            throw "Error no se pudo cerrar sesion"
        }
    },
    async registry(elemento){
        try{
            await apiClient.post("/user/registry", elemento)
        } catch(error){
            throw error.response.data.result
        }
    },
    async forgetPassword(elemento){
        try {
            await apiClient.post("/user/forget-password", elemento)
        } catch (error) {
            throw error.response.data.result
        }
    },
    async updatePassword(elemento){
        try {
            await apiClient.post("/user/update-password", elemento)
        } catch (error) {
            throw error.registry.data.result
        }
    }
}