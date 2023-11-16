import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLogin: false,
    usuario: { mail: "", id: "" },
    presupuesto: {
      items: [],
      importeTotal: 0,
      usuario: "",
    },
    token:'',
  }),
  actions: {
    logout() {
      this.isLogin = false;
      this.usuario = { mail: "" };
      this.clearPresupuesto();
    },
    clearPresupuesto(){
      this.presupuesto={
        items: [],
        importeTotal: 0,
        usuario: "",
        token:""
      }
    },
    login(usuario) {
      this.isLogin = true;
      this.usuario = usuario;
      this.presupuesto.usuario = {
        id:usuario.id,
        mail:usuario.mail
      };
    },
    loggueado() {
      return this.isLogin;
    },
    getState() {
      return {
        isLogin: this.isLogin,
        usuario: this.usuario,
        presupuesto: this.presupuesto,
      };
    },
    getId() {
      return this.usuario.id;
    },
    addProduct(item) {
      // Push the item to the items array
      this.presupuesto.items.push(item);
      // Recalculate importeTotal based on the updated items array
      this.presupuesto.importeTotal = this.presupuesto.items.reduce(
        (acc, item) => acc + item.total,
        0
      );
    },
    getPresupuesto(){
      return this.presupuesto;
    },
    getToken(){
      return this.token;
    },
    setToken(token){
      this.token = token;
    }
  },
});
