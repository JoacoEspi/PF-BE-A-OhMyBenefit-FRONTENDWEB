<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-6 text-center mb-4">
        <img
          src="../assets/images/LogoOMB-sin-fondo.png"
          alt="LogoAplicacion"
          width="300"
          height="300"
        />
      </div>
      <div class="col-md-6 mb-4">
        <div class="product-details">
          <h1 class="mb-4 d-flex flex-column align-items-center">
            Nombre del Producto {{ product.nombre }}
          </h1>
          <p class="mb-4">Codigo: {{ product.codigo }}</p>
          <p class="mb-4">Categoría: {{ product.categorias }}</p>
          <h4 class="mb-4 d-flex flex-column align-items-center">
            Aca va el Precio {{ product.precio }}
          </h4>
          <a
            href="#"
            class="btn btn-primary d-flex flex-column align-items-center"
          >
            Ver Comercios
          </a>
        </div>
      </div>
    </div>

    <div class="recommendations">
      <h3>Productos Sugeridos</h3>
      <br />
      <div class="container px-4 text-center">
        <div class="row gx-5">
          <div class="col">
            <div class="card" style="width: 18rem">
              <img
                src="../assets/images/LogoOMB-sin-fondo.png"
                alt="LogoAplicacion"
                width="100"
                height="100"
                class="mx-auto"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Producto 1 {{ recommendations.nombre }}
                </h5>
                <p class="card-text">Codigo: {{ recommendations.codigo }}</p>
                <p class="card-text">Precio: {{ recommendations.precio }}</p>
                <a href="#" class="btn btn-primary">Ver Detalle</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem">
              <img
                src="../assets/images/LogoOMB-sin-fondo.png"
                alt="LogoAplicacion"
                width="100"
                height="100"
                class="mx-auto"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Producto 1 {{ recommendations.nombre }}
                </h5>
                <p class="card-text">Codigo: {{ recommendations.codigo }}</p>
                <p class="card-text">Precio: {{ recommendations.precio }}</p>
                <a href="#" class="btn btn-primary">Ver Detalle</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem">
              <img
                src="../assets/images/LogoOMB-sin-fondo.png"
                alt="LogoAplicacion"
                width="100"
                height="100"
                class="mx-auto"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Producto 1 {{ recommendations.nombre }}
                </h5>
                <p class="card-text">Codigo: {{ recommendations.codigo }}</p>
                <p class="card-text">Precio: {{ recommendations.precio }}</p>
                <a href="#" class="btn btn-primary">Ver Detalle</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productService from "../service/productService.js";
export default {
  data() {
    return {
      product: {},
      recommendations: [],
    };
  },
  async mounted() {
    const productId = this.$route.params.id; // Obtiene el ID del producto de los parámetros de ruta
    const userId = this.$route.params.idUsuario; // Obtiene el ID del usuario de los parámetros de ruta

    try {
      // Llama al servicio para obtener los detalles del producto y las recomendaciones.
      const response = await productService.detailProduct(productId, userId);
      this.product = response.product;
      this.recommendations = response.recommendations;
      console.log("Hola");
      console.log(this.product);
      console.log(this.recommendations);

    } catch (error) {
      console.error("Error al obtener los detalles del producto", error);
    }
  },
};
</script>

<style scoped>
/* Agrega estilos CSS aquí según tus necesidades */
</style>
