const movieService = require('../services/movieService');
const imageService = require('../services/imageService');

// Controlador para obtener todas las películas
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas.' });
  }
};

// Controlador para obtener una película por ID
const getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie || movie.isDeleted) {
      return res.status(404).json({ error: 'Película no encontrada.' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la película.' });
  }
};

// Controlador para crear una nueva película
const createMovie = async (req, res) => {
  try {
    const { nombre, resumen, rating, categoria, imagen } = req.body;

    // Subir la imagen (si existe) y obtener la URL
    let imageUrl = null;
    if (imagen) {
      imageUrl = await imageService.uploadImage(imagen);
    }

    // Crear la película
    const newMovie = await movieService.createMovie({ 
      nombre, 
      resumen, 
      rating, 
      categoria, 
      imagen: imageUrl 
    });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la película.' });
  }
};

// Controlador para actualizar una película
const updateMovie = async (req, res) => {
  try {
    const { nombre, resumen, rating, categoria, imagen } = req.body;

    // Subir la nueva imagen (si se envía)
    let imageUrl = null;
    if (imagen) {
      imageUrl = await imageService.uploadImage(imagen);
    }

    // Actualizar la película
    const updatedMovie = await movieService.updateMovie(req.params.id, {
      nombre,
      resumen,
      rating,
      categoria,
      imagen: imageUrl
    });

    if (!updatedMovie) {
      return res.status(404).json({ error: 'Película no encontrada o eliminada.' });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la película.' });
  }
};

// Controlador para eliminar (soft delete) una película
const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await movieService.deleteMovie(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Película no encontrada o ya eliminada.' });
    }

    res.status(200).json({ message: 'Película eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la película.' });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
