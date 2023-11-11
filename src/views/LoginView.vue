<template>
  <div class="container">
    <div class="warning-container">
      <div v-if="warningMessage" class="warning-message">
        <br>
        {{ warningMessage }}
        <br>
        <p> </p>
        <button class="btn-warning" @click="closeMsg">x</button>
      </div>
    </div>
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
      <RouterLink to="/register">
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

export default {
  data() {
    return {
      mail: "",
      contrasenia: "",
      user: {
        mail: "",
        contrasenia: ""
      },
      warningMessage:""
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
        console.log(this.user)
        // Send the data to your backend server
        const response = await service.login(this.user);
        // Handle the response if needed
        console.log('Response from the server:', response);
        this.$router.push('/home')

      } catch (error) {
        console.error('Error sending data to the server:', error);
        this.mostrarError()
      }

      
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
  /* Remove the button border */
  padding: 10px 20px;
  /* Add padding for spacing inside the button */
  margin-top: 20px;
  font-size: 16px;
  /* Set the font size */
  cursor: pointer;
  /* Change cursor to pointer on hover for a clickable appearance */
  border-radius: 112px;
  /* Add rounded corners */
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
.warning-message {
  background-color: #e1386e;
  /* Warning message background color */
  color: #fdfff8;
  /* Warning message text color */
  padding-right: 20px;
  padding-left: 20px;
  /* Add padding for better visibility */
  margin-bottom: 10px;
  /* Add margin to separate from other content */
  border: 1px solid #fdcb6e;
  /* Border color */
  border-radius: 5px;
  /* Border radius for rounded corners */
  border-radius: 20px;
}

.btn-warning {
  position: absolute;
  top: 5px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: bolder;
  color: #fdfff8;
}

.warning-container {
  position: relative;
}
</style>
  