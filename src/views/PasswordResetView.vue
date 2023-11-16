<template>
  <div class="container">
    <h1>Restablecer contraseña</h1>
    <form @submit.prevent="submitForm">
      <div class="reset-pass-input">
        <div class="form-group">
          <label for="email">Ingrese su email</label>
          <input id="email" v-model="mail" type="email" placeholder="Email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="preguntas">Seleccione su pregunta de seguridad</label>
          <div id="preguntasHelp" class="form-text">La pregunta debe ser la que seleccionó al <br> registrarse</div>
          <select class="form-control" id="securityQuestion" v-model="pregunta" aria-describedby="preguntasHelp">
            <option value="" hidden>Elija su pregunta</option>
            <option value="Nombre de Mascota">Nombre de Mascota</option>
            <option value="Postre Favorito">Postre Favorito</option>
            <option value="Color Favorito">Color Favorito</option>
            <option value="Apellido de Abuelo">Apellido de Abuelo</option>
          </select>
        </div>
        <div class="form-group">
          <label for="respuesta">Ingrese su respuesta</label>
          <input id="respuesta" v-model="respuesta" type="text" placeholder="Respuesta" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="nuevaContrasenia1">Escriba su nueva contraseña</label>
          <div id="contraHelp" class="form-text">Debe incluir una mayuscula, un numero y un <br> caracter especial</div>
          <input id="nuevaContrasenia1" v-model="nuevaContrasenia1" placeholder="Contraseña nueva"
            aria-describedby="contraHelp" @input="checkPasswordMatch" type="password" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="nuevaContrasenia2">Escriba su nueva contraseña nuevamente</label>
          <input id="nuevaContrasenia2" v-model="nuevaContrasenia2" placeholder="Contraseña nueva" @input="checkPasswordMatch" type="password"
            class="form-control" required />
        </div>
      </div>
      <div class="error-message text-center" v-if="passwordMismatch">
            Las contraseñas no coinciden
      </div>
      <!-- Submit Button -->
      <div class="submit-holder">
        <button type="submit" @click="sendData" class="btn submit-btn">Restablecer contraseña</button>
      </div>
    </form>
  </div>
</template>
  
<script>

import service from '../service/userService.js';

export default {
  data() {
    return {
      warningMessage: "",
      mail: "",
      seguridad: {
        pregunta: '',
        respuesta: ''
      },
      pregunta: '',
      respuesta: '',
      nuevaContrasenia1: '',
      nuevaContrasenia2:'', 
      contrasenia:'',
      passwordMismatch: false
    };
  },
  methods: {
    async sendData() {
      if (this.nuevaContrasenia1 !== this.nuevaContrasenia2) {
        this.passwordMismatch = true;
        alert("Las contraseñas no coinciden");
        return; // No envíes el formulario si las contraseñas no coinciden
      }
      this.seguridad.pregunta = this.pregunta
      this.seguridad.respuesta = this.respuesta

      var elemento = {
        mail: this.mail,
        nuevaContrasenia: this.contrasenia,
        seguridad: this.seguridad
      }

      console.log(elemento)

      try {
        const response = await service.forgetPassword(elemento)
        this.$router.push({ name: "login" })

      } catch (error) {
        console.error('Error sending data to the server:', error);
        alert("Hubo un error al cambiar su contraseña. Por favor chequee sus datos y vuelva a intentar")
      }
    },
    checkPasswordMatch() {
      if (this.nuevaContrasenia1 !== this.nuevaContrasenia2) {
        this.passwordMismatch = true;
      } else {
        this.passwordMismatch = false;
        // Asigna la contrasena
        this.contrasenia = this.nuevaContrasenia1;
      }
    }
  },
};
</script>
  

<style scoped>
.container {
  color: #e1386e;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fdfff8;
  margin-top: 20px;
}

h1 {
  padding-top: 30px;
  padding: 20px;
  font-weight: bold;
}

label {
  color: #01ac93;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  height: 50px;
  width: 300px;
  padding: 10px 20px;
  color: #e1386e;
  margin-top: 18px;
  margin-bottom: 18px;
}

.submit-holder {
  text-align: center;
}

.submit-btn {
  text-align: center;
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

.submit-btn:hover {
  background-color: #e1386e;
  color: #fdfff8;
}

.submit-btn:active {
  transform: translateY(2px);
  background-color: #820646 !important;
  box-shadow: none;
  color: #fdfff8 !important;
}

</style>
  