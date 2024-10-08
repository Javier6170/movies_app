const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const validateMovie = require('../middlewares/validateMovie');  // Middleware de validación

// Obtener todas las películas (incluye filtro por isDeleted)
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.findAll({
      where: { isDeleted: false }
    });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las películas.' });
  }
});

// Obtener una película por ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie || movie.isDeleted) {
      return res.status(404).json({ error: 'Película no encontrada.' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la película.' });
  }
});

// Crear una nueva película con validación
router.post('/', validateMovie, async (req, res) => {
  try {
    const { nombre, resumen, rating, categoria, imagen } = req.body;
    const newMovie = await Movie.create({ nombre, resumen, rating, categoria, imagen });
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la película.' });
  }
});

// Actualizar una película existente con validación
router.put('/:id', validateMovie, async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie || movie.isDeleted) {
      return res.status(404).json({ error: 'Película no encontrada.' });
    }

    const { nombre, resumen, rating, categoria, imagen } = req.body;
    movie.nombre = nombre || movie.nombre;
    movie.resumen = resumen || movie.resumen;
    movie.rating = rating || movie.rating;
    movie.categoria = categoria || movie.categoria;
    movie.imagen = imagen || movie.imagen;

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la película.' });
  }
});

// Eliminar (soft delete) una película
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie || movie.isDeleted) {
      return res.status(404).json({ error: 'Película no encontrada.' });
    }

    movie.isDeleted = true;
    await movie.save();
    res.json({ message: 'Película eliminada correctamente.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la película.' });
  }
});

module.exports = router;
