<template>
  <div class="mx-auto text-center">
    <h2 class="fs-3">Registro</h2>
    <br />
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group col-md-6 mb-3 mx-auto text-center">
          <label for="inputNombre">Nombre</label>
          <input
            type="text"
            class="form-control"
            id="inputNombre"
            placeholder="Nombre"
            v-model="nombre"
          />
        </div>
        <div class="form-group col-md-6 mb-3 mx-auto text-center">
          <label for="inputApellido">Apellido</label>
          <input
            type="text"
            class="form-control"
            id="inputApellido"
            placeholder="Apellido"
            v-model="apellido"
          />
        </div>
        <div class="form-group col-md-6 mb-3 mx-auto text-center">
          <label for="inputTelefono">Teléfono</label>
          <input
            type="text"
            class="form-control"
            id="inputTelefono"
            placeholder="Teléfono"
            v-model="telefono"
            pattern="\d*"
            minlength="9"
            maxlength="12"
          />
        </div>
        <div class="form-group col-md-6 mb-3 mx-auto text-center">
          <label for="inputCorreo">Correo Electrónico</label>
          <input
            type="email"
            class="form-control"
            id="inputCorreo"
            placeholder="Correo Electrónico"
            v-model="mail"
          />
        </div>
      </div>
      <div class="form-group col-md-6 mb-3 mx-auto text-center">
        <label for="inputFecha">Fecha de Nacimiento</label>
        <input
          type="date"
          class="form-control"
          id="inputFecha"
          placeholder="1234 Main St"
          v-model="fechaNacimiento"
        />
      </div>
      <div class="form-group col-md-6 mb-3 mx-auto text-center">
        <label for="securityQuestion">Pregunta de Seguridad</label>
        <select
          class="form-control"
          id="securityQuestion"
          v-model="seguridad.pregunta"
        >
          <option value="Nombre de Mascota">Nombre de Mascota</option>
          <option value="Postre Favorito">Postre Favorito</option>
          <option value="Color Favorito">Color Favorito</option>
          <option value="Apellido de Abuelo">Apellido de Abuelo</option>
        </select>
      </div>
      <div class="form-group col-md-6 mb-3 mx-auto text-center">
        <label for="securityAnswer">Respuesta de Seguridad</label>
        <input
          type="text"
          class="form-control"
          id="securityAnswer"
          v-model="seguridad.respuesta"
        />
      </div>
      <div class="form-group col-md-6 mb-3 mx-auto text-center">
        <label for="inputPass1">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="inputPass1"
          v-model="password1"
          @input="checkPasswordMatch"
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6 mb-3 mx-auto text-center">
          <label for="inputPass2">Repetir Contraseña</label>
          <input
            type="password"
            class="form-control"
            id="inputPass2"
            v-model="password2"
            @input="checkPasswordMatch"
          />
        </div>
      </div>
      <div class="error-message" v-if="passwordMismatch">
        Las contraseñas no coinciden
      </div>
      <div class="mt-3">
        <button type="submit" class="btn btn-primary">Registrar</button>
        <br />
      </div>
    </form>
  </div>
</template>

<script>
import service from "../service/userService.js";

export default {
  data() {
    return {
      nombre: "",
      apellido: "",
      telefono: "",
      mail: "",
      fechaNacimiento: "",
      contrasenia: "",
      password1: "",
      password2: "",
      passwordMismatch: false,
      seguridad: {
        pregunta: "",
        respuesta: "",
      },
    };
  },
  methods: {
    checkPasswordMatch() {
      if (this.password1 !== this.password2) {
        this.passwordMismatch = true;
      } else {
        this.passwordMismatch = false;
        // Asigna la contrasena
        this.contrasenia = this.password1;
      }
    },
    async submitForm() {
      // Validación adicional, por ejemplo, verifica si las contraseñas coinciden
      if (this.password1 !== this.password2) {
        this.passwordMismatch = true;
        alert("Las contraseñas no coinciden");
        return; // No envíes el formulario si las contraseñas no coinciden
      }

      // Construye el objeto de datos en el formato requerido para enviar al backend.
      const usuario = {
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        mail: this.mail,
        fechaNacimiento: this.fechaNacimiento,
        contrasenia: this.contrasenia, // Utiliza la contraseña validada
        seguridad: this.seguridad,
      };

      // Llama a tu método de servicio para crear el usuario y realiza la solicitud POST.
      try {
        console.log(usuario);
        const response = await service.registry(usuario);
        console.log("despues del service");
        console.log(response);
        alert("Usuario creado exitosamente");

        // Realiza la redirección a la vista "home" después de crear el usuario
        this.$router.push({ name: "home" }); // Asegúrate de ajustar el nombre de la ruta según tu configuración
      } catch (error) {
        console.error("Error en la creación del usuario", error);
        alert("Error al crear el usuario");
      }

      // Limpia los campos después del envío o toma la acción adecuada.
      this.nombre = "";
      this.apellido = "";
      this.telefono = "";
      this.mail = "";
      this.fechaNacimiento = "";
      this.contrasenia = "";
      this.seguridad.pregunta = "";
      this.seguridad.respuesta = "";
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
