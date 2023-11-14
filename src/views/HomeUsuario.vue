<template>
  <div class="container">
    <div class="container-title">
      
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
    <hr>
    <!-- <div class="card-comment">
      <h5>Dejanos tu comentario</h5>
      <input type="text" class="input-comment">
      <a class="btn" href="#">Enviar</a>
    </div> -->
  </div>
</template>

<script>
import service from '../service/productService'

export default {
  data() {
    return {
      slides: [],
      perPage: '',
      page: '',
      listaPrueba: []
    }
  },
  async mounted() {
    try {
      // Simulate receiving an array list with 6 products
      this.page = Math.floor(Math.random() * 10) + 1;
      this.perPage = 12;

      const query = {
        page: this.page,
        perPage: this.perPage
      }
      // const listaProductos = [
      //   {
      //     nombre: "Producto 1",
      //     precio: 20.99,
      //     imageUrl: "https://ejemplo.com/imagen1.jpg",
      //   },
      //   {
      //     nombre: "Producto 2",
      //     precio: 15.49,
      //     imageUrl: "https://ejemplo.com/imagen2.jpg",
      //   },
      //   {
      //     nombre: "Producto 3",
      //     precio: 30.00,
      //     imageUrl: "https://ejemplo.com/imagen3.jpg",
      //   },
      //   {
      //     nombre: "Producto 4",
      //     precio: 25.99,
      //     imageUrl: "https://ejemplo.com/imagen4.jpg",
      //   },
      //   {
      //     nombre: "Producto 5",
      //     precio: 18.75,
      //     imageUrl: "https://ejemplo.com/imagen5.jpg",
      //   },
      //   {
      //     nombre: "Producto 6",
      //     precio: 22.50,
      //     imageUrl: "https://ejemplo.com/imagen6.jpg",
      //   },
      //   {
      //     nombre: "Producto 7",
      //     precio: 19.95,
      //     imageUrl: "https://ejemplo.com/imagen7.jpg",
      //   },
      //   {
      //     nombre: "Producto 8",
      //     precio: 35.99,
      //     imageUrl: "https://ejemplo.com/imagen8.jpg",
      //   },
      //   {
      //     nombre: "Producto 9",
      //     precio: 28.00,
      //     imageUrl: "https://ejemplo.com/imagen9.jpg",
      //   },
      //   {
      //     nombre: "Producto 10",
      //     precio: 16.49,
      //     imageUrl: "https://ejemplo.com/imagen10.jpg",
      //   },
      //   {
      //     nombre: "Producto 11",
      //     precio: 16.49,
      //     imageUrl: "https://ejemplo.com/imagen10.jpg",
      //   },
      //   {
      //     nombre: "Producto 12",
      //     precio: 16.49,
      //     imageUrl: "https://ejemplo.com/imagen10.jpg",
      //   }
      //   // Puedes seguir agregando más productos según sea necesario
      // ];

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
    async verDetalle(idProducto) {
      const response = await service.detailProduct(idProducto,/**idUsuario */)
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

.input-comment {

  height: 300px;
  width: 500px;
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

.btn {
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

@media screen and (min-width:567px) {
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

@media screen and (max-width:567px) {
  .card:not(:first-child) {
    display: none;
  }
}


.image-wrapper img {
  height: 250px;
  width: 200px;
  max-width: 100%;
  max-height: 100%;
}

.input-group-append btn {
  bottom: 5%;
}
</style>