<template>
  <h2 class="fs-3"> Crear Cuenta</h2>
  <form>
  <div class="form-row">
    <div class="form-group col-md-6 mb-3" >
      <label for="inputNombre">Nombre</label>
      <input type="text" class="form-control" id="inputNombre" placeholder="Nombre">
    </div>
    
    <div class="form-group col-md-6 mb-3">
      <label for="inputApellido">Apellido</label>
      <input type="text" class="form-control" id="inputApellido" placeholder="Apellido">
    </div>

    <div class="form-group col-md-6 mb-3">
      <label for="inputCorreo">Correo Electronico</label>
      <input type="mail" class="form-control" id="inputCorreo" placeholder="Correo Electronico">
    </div>

  </div>

  <div class="form-group col-md-6 mb-3">
    <label for="inputFecha">Fecha de Nacimiento</label>
    <input type="date" class="form-control" id="inputFecha" placeholder="1234 Main St">
  </div>

  <div class="form-group col-md-6 mb-3">
    <label for="inputPass1">Contrasena</label>
    <input type="password" class="form-control" id="inputPass1">
  </div>

  <div class="form-row">
    <div class="form-group col-md-6 mb-3">
      <label for="inputPass2">Repetir Contrasena</label>
      <input type="text" class="form-control" id="inputPass2">
    </div>
  </div>
  <div class="mt-3">
  <button type="submit" class="btn btn-primary" > Registrar</button>
  </div>
</form>
  </template>


<script>

</script>

  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  