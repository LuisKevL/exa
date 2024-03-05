import axios from "axios";

const API_URL = "http://localhost:8082/api/books/";

const crearLibro = async (autor, fechaPublicacion, nombre, portada) => {
  try {
    const response = await axios.post(API_URL, {
      autor,
      fechaPublicacion,
      nombre,
      portada
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  crearLibro,
};
