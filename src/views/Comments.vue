<template>
  <div>
    <div class="center-container comment-input-container">
      <div class="card-comment">
        <h5 class="comment-input-container">Dejanos tu comentario</h5>
        <div class="comment-input-container list-comments">
          <textarea
            v-model="nuevoComentario"
            type="text"
            class="input-comment"
            style="
              font-size: 14px;
              box-sizing: border-box;
              height: 80px;
              width: 300px;
              padding: 10px;"></textarea>
        </div>
        <br />
        <button @click="enviarComentario" type="button" class="btn btn-outline-success">Enviar</button>
      </div>
    </div>

    <div class="comment-input-container">
      <h5 class="comment-input-container">Comentarios:</h5>
      <ol class="list-group list-group-numbered">
        <li
          v-for="(comment, index) in comentarios"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-start list-comments"
        >
          <div class="ms-2 me-auto list-comments">
            <div class="fw-bold list-comments">{{ comment.comentario }}</div>
            <div v-if="comment.score < 0" style="color: #e1386e" class="fw-bold list-comments"> Analisis: Negativo</div>
            <div v-else-if="comment.score === 0" style="color: orange" class="fw-bold list-comments">Analisis: Neutral</div>
            <div v-else style="color: #01ac93" class="fw-bold list-comments">Analisis: Positivo</div>
          </div>
          <span class="badge bg-success rounded-pill list-comments">Score: {{ comment.score.toFixed(2) }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>


<script>
import service from "../service/userService.js";

export default {
  data() {
    return {
      nuevoComentario: "",
      comentarios: [],
    };
  },
  methods: {
    async enviarComentario() {
      try {
        
        if(!this.nuevoComentario){
          alert("El comentario está vacio")
          return;
        }
        const nuevoComentarioAnalizado = await service.analyzeSentiment({
          comentario: this.nuevoComentario,
        });

        this.comentarios.unshift(nuevoComentarioAnalizado); 
        // Muestra la alerta de agradecimiento
        alert("¡Gracias por tu comentario!");
        this.limpiarComentario();
        
      } catch (error) {
        console.error("Error en enviarComentario:", error);
      }
    }
  },
  computed:{
    limpiarComentario(){
      this.nuevoComentario = "";
    }
  },
  async mounted() {
    try {
      this.comentarios = await service.commentsListAll();
    } catch (error) {
      console.error("Error al obtener la lista de comentarios:", error);
    }
  },
};
</script>

<style>
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
}

.card-comment {
  text-align: center;
  margin-bottom: 30px;
  font-family: Arial, Helvetica, sans-serif;
}

.comment-input-container {
  margin: auto; 
  font-family: Arial, Helvetica, sans-serif;
  color: #E1386E;
  font-weight: bold; 
  margin-bottom: 20px; 
  margin-left: 10px; 
  margin-right: 10px;
}

.list-comments{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
</style>
