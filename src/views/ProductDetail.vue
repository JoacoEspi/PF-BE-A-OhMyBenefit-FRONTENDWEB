<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-6 text-center mb-4">
        <img
          :src="product.imageUrl"
          :alt="product.nombre"
          width="300"
          height="300"
        />
      </div>

      <div class="col-md-6 mb-4">
        <div class="product-details">
          <div class="card">
            <h5 class="card-header align-items-center calibri-font">
              {{ product.nombre }}
            </h5>
            <div class="card-body">
              <p class="mb-4 calibri-font1">
                <span class="fw-bold">Codigo: </span>{{ product.codigo }}
              </p>
              <p class="mb-4 calibri-font1">
                <span class="fw-bold">Categoría:</span> {{ product.categorias }}
              </p>
              <h4
                class="mb-4 d-flex flex-column align-items-center calibri-font"
              >
                $ {{ product.precio }}
              </h4>
              <a
                href="#"
                type="button"
                class="btn btn-outline-primary d-flex flex-column"
              >
                Ver Comercios
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="recommendations">
      <h3 class="text-center mb-4 calibri-font">Productos Relacionados</h3>
      <div class="container px-4 text-center">
        <div class="row">
          <div
            class="col col-sm-6 col-md-4"
            v-for="(recommendation, index) in recommendations.recomms"
            :key="index"
          >
            <div class="card mb-4" style="width: 18rem">
              <img
                :src="recommendation.values.imageUrl[0]"
                :alt="recommendation.values.nombre"
                width="100"
                height="100"
                class="mx-auto"
              />
              <div class="card-body">
                <h5 class="card-title calibri-font1">
                  {{ recommendation.values.nombre }}
                </h5>
                <p class="card-text">
                  Código: {{ recommendation.values.codigo }}
                </p>
                <p class="card-text">
                  Precio: $ {{ recommendation.values.precio }}
                </p>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="selectProductAndRedirect(recommendation)"
                >
                  Ver Detalle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service/productService.js";
export default {
  data() {
    return {
      product: {},
      recommendations: [],
    };
  },
  async mounted() {
    const productId = this.$route.params.id;
    const userId = this.$route.params.idUsuario;
    try {
      const response = await service.detailProduct(productId, userId);
      console.log(response);
      this.product = response.producto;
      this.recommendations = response.recomendaciones;
    } catch (error) {
      console.error("Error al obtener los detalles del producto", error);
    }
  },
  methods: {
    selectProductAndRedirect(recommendation) {
      this.redirectToDetailPage(
        recommendation.id,
        this.$route.params.idUsuario
      );
    },
    async redirectToDetailPage(productId, userId) {
      console.log("Redirección a la página de detalle iniciada.");
      console.log("Product ID:", productId); 
      console.log("User ID:", userId);

      try {
        console.log("Antes del service")
        const response = await service.detailProduct(productId, userId);
        console.log(" Despues del Service")
        this.product = response.producto;
        this.recommendations = response.recomendaciones;

        this.$router.push({
          name: 'product-detail',
          params: {
            productId: productId,
            userId: userId, 
          },
        });
      } catch (error) {
        console.error("Error al obtener los detalles del producto", error);
      }
      console.log(productDetails);
    },
  },
};
</script>

<style scoped>
.calibri-font {
  font-family: "Calibri", sans-serif;
  font-size: 24px;
  font-weight: bold;
}

.calibri-font1 {
  font-family: "Calibri", sans-serif;
  font-size: 15px;
  font-weight: bold;
}
</style>
