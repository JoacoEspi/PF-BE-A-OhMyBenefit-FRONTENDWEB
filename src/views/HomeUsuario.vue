<template>
  <div class="container">
    <div class="container-title">
      <div class="input-group">
        <input type="text" v-model="wordSearch" class="searchbar" placeholder="Ingrese el nombre del producto">
        <button type="submit" class="btn-buscar" @click="buscarProducto">Buscar</button>
      </div>
      <p v-if="errorMsg">{{ errorMsg }}</p>
      <div v-if="mostrarMsg" class="message">
        <div class="alert alert-success" role="alert">
          <p>{{ agregadoMessage }}</p>
        </div>
      </div>
      <div v-if="busqueda.length > 0" class="list-products">
        <h3>Resultados de busqueda</h3>
        <button class="clear-button" @click="borrarBusqueda">X Borrar busqueda</button>
        <table class="table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Comercio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in busqueda" :key="index">
              <td>
                <div class="image-wrapper-result">
                  <img :src="product.imageUrl" alt="Imagen del producto">
                </div>
              </td>
              <td>
                <h5 class="card-title">{{ product.nombre }}</h5>
              </td>
              <td>
                <p class="card-text">${{ product.precio }}</p>
              </td>
              <td>
                <div v-if="product.idComercio == 1">
                  <p class="card-text">Coto</p>
                </div>
                <div v-else-if="product.idComercio == 2">
                  <p class="card-text">Carrefour</p>
                </div>
                <div v-else-if="product.idComercio == 3">
                  <p class="card-text">Dia</p>
                </div>
              </td>
              <td>
                <div class="item-button-wrapper">
                  <button class="btn" @click="verDetalle(product._id)">Ver Detalle</button>
                  <br>
                  <button class="btn" @click="agregarProducto(product._id)">Agregar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>Encontra tu producto al mejor precio</h1>
      <div class="carousel-title">
        <h4>Productos destacados</h4>
      </div>
    </div>
    <div id="carouselExample" class="carousel carousel-dark slide">
      <div class="carousel-inner">
        <div v-for="(slide, index) in this.slides" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }">
          <div class="cards-wrapper">
            <div v-for="(product, cardIndex) in slide.products" :key="cardIndex" class="card">
              <div class="image-wrapper">
                <img :src="product.imageUrl" alt="Imagen del producto">
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ product.nombre }}</h5>
                <p class="card-text">${{ product.precio }}</p>
                <a href="#" class="btn" @click="verDetalle(product._id)">Ver detalles</a>
                <a href="#" class="btn" @click="agregarProducto(product._id)">Agregar</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import service from '../service/productService'
import { useUserStore } from '../stores/userStore';

export default {
  data() {
    return {
      slides: [],
      perPage: '',
      page: '',
      listaPrueba: [],
      product: '',
      wordSearch: '',
      busqueda: [],
      errorMsg: '',
      agregadoMessage: '',
      mostrarMsg: false,
      cantidad: 1
    }
  },
  async mounted() {
    try {
      this.page = Math.floor(Math.random() * 10) + 1;
      this.perPage = 12;

      const query = {
        page: this.page,
        perPage: this.perPage
      }
      //Check if the response has a 'docs' property
      const response = await service.listAllProducts(query);
      if (response.docs) {
        this.listaPrueba = response.docs;
        // Divide the products into two slides
        const productosPorSlide = 3;
        for (let i = 0; i < this.listaPrueba.length; i += productosPorSlide) {
          this.slides.push({
            products: this.listaPrueba.slice(i, i + productosPorSlide),
          });
        }

      }
    } catch (error) {
      console.error("Error in listAllProducts:", error);
      throw "Unknown error";
    }

  },
  methods: {
    verDetalle(idProducto) {
      const idUsuario = useUserStore().getId()
      this.$router.push(`/product/${idProducto}/${idUsuario}`,);
    },
    async agregarProducto(idProducto) {
      try {

        const response = await service.getProductById(idProducto);
        console.log(response)
        const cantidad = this.cantidad
        const precioUnitario = parseFloat(this.formatearPrecio(response.precio).replace(',', '.'));
        const item = {
          producto: response,
          cantidad: cantidad,
          precioUnitario: precioUnitario,
          total: cantidad * precioUnitario
        }
        useUserStore().addProduct(item)
        this.mostrarAgregado()
      } catch (error) {
        alert("Hubo un error al agregar al presupuesto")
      }
    },
    async buscarProducto() {
      try {
        this.errorMsg = ''
        if (this.wordSearch) {
          const response = await service.searchProductByWord(this.wordSearch)
          this.busqueda = response
          console.log(this.busqueda)

          if (response.success == false) {
            throw new Error(response.message)
          }

          if (Array.isArray(response)) {
            // Handle simple array
            this.busqueda = response.slice(0, 20) // Save only the first 20 products
          } else if (response && response.totalProducts) {
            // Handle object with multiple arrays
            const allProducts = response.products.flat(); // Flatten the arrays
            this.busqueda = allProducts.slice(0, 20) // Save only the first 20 products
          }
          this.busqueda = this.busqueda
            .map((product) => ({
              ...product,
              precio: this.formatearPrecio(product.precio),
            }))
            .sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));

        } else {
          throw new Error("La palabra a buscar esta vacia")
        }
      } catch (error) {
        this.errorMsg = "No se pudo encontrar el producto"
      }
    },
    borrarBusqueda() {
      this.busqueda = ''
      this.errorMsg = ''
    },
    verPresupuesto() {
      this.$router.push({ name: 'budget' })
    },
    mostrarAgregado() {
      this.mostrarMsg = true
      this.agregadoMessage = "Agregado al presupuesto!"

      setTimeout(() => {
        this.mostrarMsg = false;
        this.agregadoMessage = '';
      }, 3000)
    },
    formatearPrecio(precio) {
      const numero = parseFloat(precio.replace('.', '').replace(',', '.'));

      if (!isNaN(numero)) {
        let precioFormateado = numero.toFixed(2).replace('.', ',');

        if (numero > 9999.99) {
          precioFormateado = (numero / 1000).toFixed(2).replace('.', ',');
        }
        return precioFormateado;
      } else {
        return precio;
      }
    }
  }
}
</script>
<style scoped>
.container {
  background-color: #fdfff8;
}

.container-title {
  color: #e1386e;
  font-weight: bolder;
  text-align: center;
  margin-top: 2%;
  margin-bottom: 2%;
}

.list-products {
  margin-top: 20px;
}

.table {
  width: 100%;
  margin-top: 10px;
}

th,
td {
  padding: 8px;
  text-align: left;
}

.image-wrapper-result {
  max-width: 100%;
}

@media screen and (max-width: 767px) {
  .item-button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item-button-wrapper button {
    margin-bottom: 10px;
  }

  th,
  td {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  td {
    text-align: center;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .searchbar {
    width: 80%;
    margin-bottom: 10px;
  }
}

.card {
  border-radius: 5%;
}

h4 {
  background-color: #01ac93;
  color: #fdfff8;
  border-radius: 30px;
  margin-right: 5px;
  margin-left: 5px;
}

.card-comment,
h4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 20px auto;
}

.carousel-control-prev,
.carousel-control-next {
  background-color: #01ac93;
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.btn-buscar {
  background-color: #01ac93;
  color: #fdfff8;
  border: none;
  padding: 10px 20px;
  box-shadow: 5px 5px rgba(0, 0, 0, 1);
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-buscar:active {
  transform: translateY(2px);
  background-color: #055949 !important;
  box-shadow: none;
  color: #fdfff8 !important;
}

.btn {
  background-color: #e1386e;
  color: #fdfff8;
  border: none;
  padding: 10px 20px;
  margin-left: 2%;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 112px;
  box-shadow: 5px 5px rgba(0, 0, 0, 1);
  transition: transform 0.2s;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.btn:hover {
  background-color: #e1386e;
  color: #fdfff8;
}

.btn:active {
  transform: translateY(2px);
  background-color: #820646 !important;
  box-shadow: none;
  color: #fdfff8 !important;
}

@media screen and (min-width: 567px) {
  .cards-wrapper {
    display: flex;
  }

  .card {
    margin: 0 .5em;
    width: calc(100%/3);
  }

  .image-wrapper {
    height: 22vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}

@media screen and (max-width: 567px) {
  .card:not(:first-child) {
    display: none;
  }

  th {
    display: none;
  }
}

.image-wrapper img {
  height: 250px;
  width: 200px;
  max-width: 100%;
  max-height: 100%;
}

.image-wrapper-result img {
  height: 200px;
  width: 200px;
  max-width: 100%;
  max-height: 100%;
}

.input-group {
  margin-bottom: 30px;
  margin-top: 30px;
}

.input-group btn {
  height: 40px;
}

.searchbar {
  padding: 1%;
  width: 80%;
}

.clear-button {
  border-color: #e1386e;
  background-color: transparent;
  color: #e1386e;
  border-radius: 30px;
  font-size: small;
}
</style>