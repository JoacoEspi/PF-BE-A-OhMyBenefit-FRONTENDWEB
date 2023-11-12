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
          <label for="nuevaContrasenia">Escriba su nueva contraseña</label>
          <div id="contraHelp" class="form-text">Debe incluir una mayuscula, un numero y un <br> caracter especial</div>
          <input id="nuevaContrasenia" v-model="nuevaContrasenia" placeholder="Contraseña nueva"
            aria-describedby="contraHelp" type="password" class="form-control" required />
        </div>
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
      nuevaContrasenia: ''
    };
  },
  methods: {
    async sendData() {
      this.seguridad.pregunta = this.pregunta
      this.seguridad.respuesta = this.respuesta

      var elemento = {
        mail: this.mail,
        nuevaContrasenia: this.nuevaContrasenia,
        seguridad: this.seguridad
      }

      console.log(elemento)

      try {
        const response = await service.forgetPassword(elemento)
        this.$router.push({name:"login"})

      } catch (error) {
        console.error('Error sending data to the server:', error);
        this.mostrarError()
      }
    },
    mostrarError() {
      this.warningMessage = "Hubo un error al cambiar su contraseña. Por favor revise que los campos contengan la informacion correcta"
    },
    closeMsg() {
      this.warningMessage = ''
    }
  },
};
</script>
  

<style scoped>
/* Add your specific styles here */
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
  