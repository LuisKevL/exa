import axios from "axios";

const API_URL = "http://localhost:8082/api/books/";

const obtenerLibros = async (autor, fechaPublicacion, nombre, portada) => {
  try {
    const response = await axios.get(API_URL, {
      params: { autor, fechaPublicacion, nombre, portada },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  obtenerLibros,
};
