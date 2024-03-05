<template>
  <div>


    <h1>Listado de libros</h1>

    <b-button @click="modalShow = !modalShow" variant="primary" class="btn-add-movie">
      <b-icon icon="plus"></b-icon>
    </b-button>

    <div class="container mt-3">
      <b-button-group>
        <b-button variant="primary" class="btn-add-movie">
          <span class="sr-only">Ordenar por autor</span>
        </b-button>
        <b-button variant="primary" class="btn-add-movie">
          <span class="sr-only">Ordenar por fecha</span>
        </b-button>
        <b-button variant="primary" class="btn-add-movie">
          <span class="sr-only">Mostrar si tiene imagen</span>
        </b-button>
      </b-button-group>
    </div>

    <div class="container mt-5">
      <div class="row equal-height-cards">
        <div class="col-md-4" v-for="(libro, index) in libroService" :key="index">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Autor del libro: {{ libro.autor }}</h5>
              <p class="card-text">Fecha de publicación: {{ libro.fechaPublicacion }}</p>
              <p class="card-text">Nombre del libro: {{ libro.nombre }}</p>
              <img :src="libro.portada" class="card-img-top" alt="imagen">

            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="modalShow">
      <h1>Registrar Libro</h1>
      <b-form @submit.prevent="crearLibro">
        <b-spinner v-if="loading" label="Cargando..." variant="primary"
          style="position: absolute; top: calc(50% - 1.5rem); right: calc(50% - 1.5rem);"></b-spinner>

        <b-form-group label="Autor del Libro:" label-for="autor-libro">
          <b-form-input id="autor-libro" v-model="autor" required placeholder="Autor..."></b-form-input>
        </b-form-group>
        <b-form-group label="Fecha de publicación:" label-for="fecha-publicacion">
          <b-form-input type="date" v-model="fechaPublicacion" id="fecha-publicacion" required></b-form-input>
        </b-form-group>
        <b-form-group label="Nombre del Libro:" label-for="nombre-libro">
          <b-form-input id="nombre-libro" v-model="nombre" required placeholder="Libro..."></b-form-input>
        </b-form-group>
        <b-form-group label="Portada de libro:" label-for="portada-libro">
          <b-form-input id="portada-libro" v-model="portada" required placeholder="Portada..."></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Registrar</b-button>
        <div v-if="error" class="text-danger">{{ error }}</div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { BButtonGroup, BButton } from 'bootstrap-vue';
import PostLibro from '../services/PostLibro';
import libroService from '../services/Libro';

export default {
  name: 'Peliculas',
  components: {
    BButtonGroup,
    BButton
  },
  data() {
  return {
    modalShow: false,
    libroService: [],
    nombre: '',
    autor: '',
    portada: '', // Inicializamos portada aquí
    fechaPublicacion: '',
    error: '',
    loading: false,
    scrollActivated: false,
    showCarousel: true // Definimos la propiedad showCarousel y la inicializamos como true o false según corresponda
  };
},


  methods: {
    formatFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES');
    },
    async crearLibro() {
  try {
    const { autor, fechaPublicacion, nombre, portada } = this;
    this.loading = true;
    await PostLibro.crearLibro(autor, fechaPublicacion, nombre, portada);
    this.modalShow = false;
    this.loading = false;
    // Espera a que el libro se haya creado antes de obtener la lista actualizada de libros
    await this.obtenerLibros();
  } catch (error) {
    this.loading = false;
    console.error(error);
  }
},

    async obtenerLibros() {
      try {
        const data = await libroService.obtenerLibros();
        this.libroService = data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.obtenerLibros();
  }
};
</script>

<style>
.card {
  height: 320px !important;
  width: 300px !important;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-color: white !important;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2) !important;
  padding: 2px;
  margin-top: 10px;
}

.card-img-wrapper {
  height: 100px;
  overflow: hidden;
}

.card-img-top {
  width: 45%;
  height: auto;
}

.btn-add-movie {
  position: absolute;
  top: 10px;
  right: 10px;
  margin-right: 10px;
}
</style>
