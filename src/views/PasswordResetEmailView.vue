<template>
    <div class="container text-center">
      <div class="title text-primary">
        <h1>Recupera tu</h1>
        <h1>contraseña</h1>
      </div>
      <p>Ingresa tu correo para que puedas restablecer tu contraseña</p>
      <input class="form-control mb-3" type="email" v-model="email" placeholder="Correo electrónico">
      <RouterLink to="/recover/code">
        <button class="btn custom-btn" @click="sendCode">ENVIAR CODIGO</button>
      </RouterLink>
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
      };
    },
    methods: {
      sendCode() {
        // Handle sending code logic here
      },
    },
  };
  </script>
  
  <style scoped>
    .container{
        display: flex;
        align-items: center;
        height: 100vh;
        flex-direction: column; 
        background-color: #fdfff8;
        margin-top: 20px; 
    }

    h1{
        font-weight:bold;
        color: #e1386e;
        margin: 5px;
    }
    .custom-btn {
        background-color: #e1386e;
        color: #fdfff8;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 112px;
        box-shadow: 5px 5px rgba(29, 29, 42);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        transition: transform 0.2s;
    }

    .form-control{
        max-width: 260px;
    }
    .custom-btn:hover{
        background-color: #e1386e !important;
        color: #fdfff8 !important;
    }
    .custom-btn:active {
        color: #fdfff8 !important;
        background-color: #820646 !important;
        transform: translateY(2px);
        box-shadow: none;
    }

  </style>
  