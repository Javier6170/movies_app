const Movie = require('../models/movie');

// Obtener todas las películas (que no estén eliminadas)
const getAllMovies = async () => {
  return await Movie.findAll({
    where: { isDeleted: false }
  });
};

// Obtener una película por ID
const getMovieById = async (id) => {
  return await Movie.findByPk(id);
};

// Crear una nueva película
const createMovie = async (movieData) => {
  return await Movie.create(movieData);
};

// Actualizar una película
const updateMovie = async (id, movieData) => {
  const movie = await Movie.findByPk(id);
  if (movie && !movie.isDeleted) {
    Object.assign(movie, movieData);
    return await movie.save();
  }
  return null;  // Si no se encuentra la película o está eliminada
};

// Eliminar (soft delete) una película
const deleteMovie = async (id) => {
  const movie = await Movie.findByPk(id);
  if (movie && !movie.isDeleted) {
    movie.isDeleted = true;
    return await movie.save();
  }
  return null;  // Si no se encuentra la película o está eliminada
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
