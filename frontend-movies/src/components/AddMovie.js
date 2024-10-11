import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMovie() {
  const [movie, setMovie] = useState({
    nombre: '',
    resumen: '',
    rating: '',
    categoria: '',
    imagen: ''
  });

  const navigate = useNavigate();

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value
    });
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar los datos a la API
    axios.post('http://localhost:4000/api/movies', movie)
      .then(response => {
        console.log('Película añadida:', response.data);
        navigate('/movies'); // Redirigir a la lista de películas
      })
      .catch(error => {
        console.error('Error al añadir la película:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Añadir Nueva Película</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input 
            type="text" 
            className="form-control" 
            id="nombre" 
            name="nombre" 
            value={movie.nombre} 
            onChange={handleChange} 
            required />
        </div>
        <div className="mb-3">
          <label htmlFor="resumen" className="form-label">Resumen</label>
          <textarea 
            className="form-control" 
            id="resumen" 
            name="resumen" 
            value={movie.resumen} 
            onChange={handleChange} 
            required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <input 
            type="number" 
            className="form-control" 
            id="rating" 
            name="rating" 
            value={movie.rating} 
            onChange={handleChange} 
            required min="1" max="5" />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <input 
            type="text" 
            className="form-control" 
            id="categoria" 
            name="categoria" 
            value={movie.categoria} 
            onChange={handleChange} 
            required />
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">URL de la Imagen</label>
          <input 
            type="text" 
            className="form-control" 
            id="imagen" 
            name="imagen" 
            value={movie.imagen} 
            onChange={handleChange} 
            required />
        </div>
        <button type="submit" className="btn btn-primary">Añadir Película</button>
      </form>
    </div>
  );
}

export default AddMovie;
