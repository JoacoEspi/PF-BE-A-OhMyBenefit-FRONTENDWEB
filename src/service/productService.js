import apiClient from "./apiClient.js";

export default {
    async listByCategory(categoria){
        try {
            const response = await apiClient.get(`/product/list-all/${categoria}`)
            //maybe this won't work, if so use result.data alone
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
    },
    async createProduct(elemento){
        try {
            await apiClient.post("/product/", elemento)
        } catch (error) {
            throw "Error: " + error.response.data.message
        }
    },
     //not implemented in backend
    async deleteProductById(idProducto){
        try {
            await apiClient.delete(`/product/${idProducto}`)
        } catch (error) {
            throw "Error: " + error.response.data.message
        }
    },
     //this is not correct as it could delete the wrong product
    async deleteProductByName(nombreProd){
        try {
            await apiClient.delete(`/product/${nombreProd}`)
        } catch (error) {
            throw "Error: " + error.response.data.message
        }
    },
    //not implemented in backend
    async getProductById(idProduct){
        try {
            await apiClient.get(`/product/${id}`)
        } catch (error) {
            throw "Error: " + error.response.data.message
        }
    }
}