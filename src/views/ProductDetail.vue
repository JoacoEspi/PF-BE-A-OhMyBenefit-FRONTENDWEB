<template>
  <div>
    <div v-if="mostrarMsg" class="message">
      <div class="alert alert-success" role="alert">
        <p>{{ agregadoMessage }}</p>
      </div>
    </div>
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
              <div class="cantidad-wrapper d-flex align-items-center">
                <p class="mr-2 mb-0">Cantidad:</p>
                <button @click="menos">-</button>
                <p class="mr-2 mb-0">{{ this.cantidad }}</p>
                <button @click="mas">+</button>
              </div>
              <div id="modal-structure">
                <div>
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Ver Comercios</button>
                  <button class="btn btn-primary" @click="agregarProducto">Agregar producto</button>
                  <div class="modal fade" id="myModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Obtener ubicación</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <h3>Utilice la ubicación de su dispositivo</h3>
                          <button class="btn btn-primary" style="align-self: center;" @click="getLocation"
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
                            <input type="number" class="form-control" v-model="altura" id="altura"
                              placeholder="Ingrese la altura de su dirección" :disabled="clickeado">
                          </div>
                          <div class="form-group">
                            <label for="codigoPostal">Código Postal</label>
                            <div id="cpHelp" class="form-text">Utilice el codigo postal de 4 digitos</div>
                            <input type="number" class="form-control" v-model="codigoPostal" id="codigoPostal"
                              placeholder="Ingrese el código postal de su dirección" :disabled="clickeado"
                              aria-describedby="cpHelp" min="0" max="9999">
                          </div>
                          <button class="btn btn-primary" @click="getDireccion" :disabled="clickeado">Enviar</button>
                        </div>
                        <div v-if="isLoading" class="message">
                          <div class="alert alert-info" role="alert">
                            <p>Buscando locales...</p>
                          </div>
                        </div>
                        <div class="card" v-else>
                          <div class="container-table" v-if="supermarketList.length > 0 && clickeado == true">

                            <h3>Estos son los supermercados más cercanos</h3>
                            <button class="btn btn-danger" @click="reset">Resetar ubicacion</button>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>Supermercado</th>
                                  <th>Direccion</th>
                                  <th>Distancia (km)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(supermarket, index) in supermarketList" :key="index">
                                  <td>{{ supermarket.nombre }}</td>
                                  <td>{{ supermarket.direccion }}</td>
                                  <td>{{ supermarket.distancia.toFixed(2) }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div v-else-if="supermarketList.length == 0 && clickeado == true">
                            <h4>Mmm, no parece haber supermercados que tengan el producto en tu area. Chequea la direccion
                              ingresada o intenta nuevamente con otra direccion</h4>
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
                <button type="button" class="btn btn-primary" @click="selectProductAndRedirect(recommendation)">
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
import { useUserStore } from '../stores/userStore';

export default {
  data() {
    return {
      product: {},
      cantidad: 1,
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
      supermarketList: [],
      agregadoMessage: '',
      mostrarMsg: false,
      isLoading: false,
      cantidad: 1
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
      alert("Error al obtener detalles del producto")
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async agregarProducto() {
      try {

        const cantidad = this.cantidad
        const precioUnitario = parseFloat(this.product.precio.replace(',', '.'));

        console.log('Parsed precioUnitario:', precioUnitario);

        const total = cantidad * precioUnitario;

        console.log('Calculated total:', total);

        const item = {
          producto: this.product,
          cantidad: cantidad,
          precioUnitario: precioUnitario,
          total: total,
        };

        console.log(item);
        useUserStore().addProduct(item);
        console.log(useUserStore().getState())
        this.mostrarAgregado()
      } catch (error) {
        console.error('Error adding product:', error);
        alert("Error al agregar producto")
      }
    }
    ,
    getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitud = position.coords.latitude;
          this.longitud = position.coords.longitude;
          this.sendData();
        });
      } else {
        alert("Geolocalización no está disponible en este navegador.");
      }
    },
    getDireccion() {
      this.direccion = `${this.calle} ${this.altura} + ", CP "+ ${this.codigoPostal}`;
      this.sendData();
    },
    async sendData() {
      this.isLoading = true
      this.clickeado = true;
      console.log(this.latitud, this.longitud, this.direccion, this.codComercio);

      if (!this.latitud && !this.longitud) {
        if (!this.altura || !this.calle || !this.codigoPostal) {
          this.isLoading = false;
          this.clickeado = false;
          alert("Por favor, ingrese una direccion valida o utilice su ubicacion.");
          
          return;
        }

      }

      const dataToSend = {
        latitud: this.latitud,
        longitud: this.longitud,
        codigoComercio: this.codComercio,
        direccion: this.direccion,

      };

      try {
        const response = await service.geolocation(dataToSend);
        console.log('Response from the server:', response);
        this.supermarketList = response;

      } catch (error) {
        console.error('Error sending data to the server:', error);
        alert("Error enviando ubicacion")
        this.reset()
      } finally {
        this.isLoading = false;
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
      this.cantidad = 1
    },
    async redirectToDetailPage(productId, userId) {
      try {
        const response = await service.detailProduct(productId, userId);
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
        const msg = "Error al obtener los detalles del producto"
        console.error(msg, error);
        alert(msg)
      }
    },
    mostrarAgregado() {
      this.mostrarMsg = true
      this.agregadoMessage = "Agregado al presupuesto!"

      setTimeout(() => {
        this.mostrarMsg = false;
        this.agregadoMessage = '';
      }, 3000)
    },
    mas(){
      this.cantidad++
    },
    menos(){
      if(this.cantidad>1){
        this.cantidad--
      }
    }
  },
};
</script>

<style scoped>
.btn-primary {
  text-align: center;
  background-color: #e1386e;
  color: #fdfff8;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 112px;
  box-shadow: 5px 5px rgba(0, 0, 0, 1);
  transition: transform 0.2s;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.btn-primary:hover {
  background-color: #e1386e;
  color: #fdfff8;
}

.btn-primary:active {
  transform: translateY(2px);
  background-color: #820646 !important;
  box-shadow: none;
  color: #fdfff8 !important;
}

.modal-content,
.container-table {
  color: #01ac93;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fdfff8;
  margin-top: 20px;
}

input {
  padding: 10px 20px;
  margin-top: 18px;
  margin-bottom: 18px;
}

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

.cantidad-wrapper button{
  margin: 5px 5px 5px 5px;
  border: none;
  background-color: #01ac93;
  color: #fdfff8;
  border-radius: 20px;
}
</style>
