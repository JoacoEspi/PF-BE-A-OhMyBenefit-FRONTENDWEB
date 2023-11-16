<template>
  <div class="container">
    <h1>Login</h1>
    <img src="../assets/images/LogoOMB-sin-fondo.png">
    <form @submit.prevent="login">
      <div class="login-input">
        <div class="form-group">
          <label for="email">EMAIL</label>
          <input id="mail" v-model="mail" type="text" class="form-control" required />
        </div>

        <div class="form-group">
          <label for="contrasenia">CONTRASEÑA</label>
          <input id="contrasenia" v-model="contrasenia" type="password" class="form-control" required />
        </div>
      </div>
      <RouterLink to="/recover-password">
        <a class="nav-link" href="#">He olvidado mi contraseña</a>
      </RouterLink>
      <RouterLink to="/user/registry">
        <a class="nav-link" href="#">Aun no tienes cuenta? Registrate</a>
      </RouterLink>
      <br>
      <div class="login-options">
        <button type="submit" class="btn login-btn" @click="login">INICIAR SESIÓN</button>
      </div>

    </form>
  </div>
</template>
  

<script>

import service from '../service/userService'
import {useUserStore} from "../stores/userStore"

export default {
  data() {
    return {
      mail: "",
      contrasenia: "",
      user: {
        mail: "",
        contrasenia: ""
      },
      warningMessage: ""
    };
  },
  methods: {
    login() {
      this.user.mail = this.mail
      this.user.contrasenia = this.contrasenia
      this.sendData()
    },
    async sendData() {
      try {
        const response = await service.login(this.user);
        console.log('Response from the server:', response);
        const token = response.data.token
        useUserStore().setToken(token)

        const userId = await this.getId(this.mail)

        const usuarioStore = {
          mail:this.mail,
          id: userId
        }

        useUserStore().login(usuarioStore);
        console.log(useUserStore().getState());
        this.$router.push({ name: "home-login" })

      } catch (error) {
        console.error('Error sending data to the server:', error);
        alert("Hubo un error al iniciar sesion. Por favor chequee sus datos y vuelva a intentar")
      }
    },
    async getId(mail) {
      const idUsuario = await service.getUserIdByEmail(mail)
      return idUsuario
    },
    mostrarError() {
      this.warningMessage = "Hubo un error al iniciar sesion. Por favor revise que los campos contengan la informacion correcta"
    },
    closeMsg() {
      this.warningMessage = ''
    }
  },
};
</script>

<style scoped>
.container {
  color: #e1386e;
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #fdfff8;
  margin-top: 20px;
}

img {
  height: 100px;
  width: 100px;
}

h1 {
  padding-top: 30px;
  padding: 20px;
  font-weight: bold;
}

.login-input {
  color: #01ac93;
}

.form-control {
  margin-bottom: 5px;
}

a {
  font-size: 12px;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: left;
}

.login-input input {
  height: 50px;
  width: 260px;
  padding: 10px 20px;
  color: #e1386e;
  margin-top: 18px;
  margin-bottom: 18px;
}

.login-options {
  text-align: center;
}

.login-btn {
  background-color: #e1386e;
  color: #fdfff8;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 112px;
  box-shadow: 5px 5px rgba(0, 0, 0, 1);
  transition: transform 0.2s;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-btn:hover {
  background-color: #e1386e;
  color: #fdfff8;
}

.login-btn:active {
  transform: translateY(2px);
  background-color: #820646 !important;
  box-shadow: none;
  color: #fdfff8 !important;
}
</style>
  