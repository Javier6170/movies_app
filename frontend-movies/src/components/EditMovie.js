import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    nombre: '',
    resumen: '',
    rating: '',
    categoria: '',
    imagen: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos actuales de la película
    axios.get(`http://localhost:4000/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la película:', error);
      });
  }, [id]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value
    });
  };

  // Enviar los datos actualizados a la API
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/api/movies/${id}`, movie)
      .then(response => {
        console.log('Película actualizada:', response.data);
        navigate(`/movies/${id}`); // Redirigir a los detalles de la película
      })
      .catch(error => {
        console.error('Error al actualizar la película:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Editar Película</h1>
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
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditMovie
