import apiClient from "./apiClient.js";

export default {
    async listByCategory(categoria){
        try {
            const response = await apiClient.get(`/product/list-all/${categoria}`)
            //tal vez aca deba ser response.data?? @sol
            return response.data.result
        } catch (error) {
            throw "Error: " + error.response.data.message
        }
    },
    async listAllProducts(){
        try {
            const response = await apiClient.get("/product/list-all")
            return response.data.result;
        } catch (error) {
            throw "Error: " + error.response.data.message
        }
    },
    async listByName(nombre){
        try {
            const response = await apiClient.get(`/product/${nombre}`)
            return response.data
        } catch (error) {
            throw "Error: " + error.response.data.message
        }
    }
}