<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-6 text-center mb-4">
        <img :src="product.imageUrl" :alt="product.nombre" width="300" height="300" />
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
              <h4 class="mb-4 d-flex flex-column align-items-center calibri-font">
                $ {{ product.precio }}
              </h4>
              <div id="modal-structure">
                <!-- <button @click="openModal">Ver Comercios</button>
                <LocationsModal v-if="isModalVisible" @close="closeModal" /> -->
                <div>
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Ver Comercios</button>
                  <div class="modal fade" id="myModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Obtener ubicación</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <h3>Utilice la ubicación de su dispositivo</h3>
                          <button class="btn btn-info" style="align-self: center;" @click="getLocation"
                            :disabled="clickeado">Obtener Ubicación</button>
                          <hr>
                          <h3>O ingrese una dirección para utilizar en la búsqueda</h3>
                          <div class="form-group">
                            <label for="calle">Calle</label>
                            <input type="text" class="form-control" v-model="calle" id="calle"
                              placeholder="Ingrese la calle de su dirección" :disabled="clickeado">
                          </div>
                          <div class="form-group">
                            <label for="altura">Altura</label>
                            <input type="text" class="form-control" v-model="altura" id="altura"
                              placeholder="Ingrese la altura de su dirección" :disabled="clickeado">
                          </div>
                          <div class="form-group">
                            <label for="codigoPostal">Código Postal</label>
                            <input type="text" class="form-control" v-model="codigoPostal" id="codigoPostal"
                              placeholder="Ingrese el código postal de su dirección" :disabled="clickeado">
                          </div>
                          <button class="btn btn-primary" @click="getDireccion" :disabled="clickeado">Enviar</button>
                        </div>
                        <div class="card">
                          <div class="container-table" v-if="supermarketList.length > 0 && clickeado==true">
                            
                            <h3>Estos son los supermercados más cercanos</h3>
                            <button class="btn btn-danger" @click="reset">Resetar ubicacion</button>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>Supermercado</th>
                                  <th>Direccion</th>
                                  <th>Distancia (km)</th>
                                  <!-- Add more table headers as needed -->
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(supermarket, index) in supermarketList" :key="index">
                                  <td>{{ supermarket.nombre }}</td>
                                  <td>{{ supermarket.direccion }}</td>
                                  <td>{{ supermarket.distancia.toFixed(2) }}</td>
                                  <!-- Add more table cells for other data -->
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div v-else-if="supermarketList.length == 0 && clickeado==true">
                            <h4>Mmm, no parece haber supermercados que tengan el producto en tu area. Chequea la direccion ingresada o intenta nuevamente con otra direccion</h4>
                            <button class="btn btn-danger" @click="reset">Resetar ubicacion</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          <div class="col col-sm-6 col-md-4" v-for="(recommendation, index) in recommendations.recomms" :key="index">
            <div class="card mb-4" style="width: 18rem">
              <img :src="recommendation.values.imageUrl[0]" :alt="recommendation.values.nombre" width="100" height="100"
                class="mx-auto" />
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
                <button type="button" class="btn btn-outline-primary" @click="selectProductAndRedirect(recommendation)">
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
      isModalVisible: false,
      calle: '',
      altura: '',
      codigoPostal: '',
      direccion: '',
      latitud: '',
      longitud: '',
      codComercio: '',
      clickeado: false,
      supermarketList: []
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
      this.codComercio = this.product.idComercio;
      console.log(this.codComercio)
    } catch (error) {
      console.error("Error al obtener los detalles del producto", error);
    }
  },
  methods: {
    ////***MODAL FUNCTIONS ****//////
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getLocation() {
      this.clickeado = true;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitud = position.coords.latitude;
          this.longitud = position.coords.longitude;
          // You can choose to send data here or in another function
          this.sendData();
        });
      } else {
        alert("Geolocalización no está disponible en este navegador.");
      }
    },
    getDireccion() {
      this.clickeado = true;
      this.direccion = `${this.calle} ${this.altura} + ", CP "+ ${this.codigoPostal}`;

      // You can choose to send data here or in another function
      this.sendData();
    },
    async sendData() {

      console.log(this.latitud, this.longitud, this.direccion, this.codComercio);

      const dataToSend = {
        latitud: this.latitud, // Use this.latitud and this.longitud
        longitud: this.longitud,
        codigoComercio: this.codComercio,
        direccion: this.direccion,

      };

      try {
        // Send the data to your backend server
        const response = await service.geolocation(dataToSend);

        // Handle the response if needed
        console.log('Response from the server:', response);

        this.supermarketList = response;

      } catch (error) {
        console.error('Error sending data to the server:', error);
      }

    },
    reset() {
      this.calle = ''
      this.altura = ''
      this.codigoPostal = ''
      this.latitud = ''
      this.longitud = ''
      this.supermarketList = []

      this.clickeado = false
    },
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
