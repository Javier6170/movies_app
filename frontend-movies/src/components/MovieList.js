import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [ratingFilter, setRatingFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        // Obtener todas las películas desde la API
        axios.get('http://localhost:4000/api/movies')
            .then(response => {
                setMovies(response.data);
                setFilteredMovies(response.data); // Inicialmente, todos los movies se muestran
            })
            .catch(error => {
                console.error('Error al obtener las películas:', error);
            });
    }, []);

    // Manejar cambios en los filtros
    const handleRatingChange = (e) => {
        const rating = e.target.value;
        setRatingFilter(rating);
        applyFilters(nameFilter, categoryFilter, rating);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setCategoryFilter(category);
        applyFilters(nameFilter, category, ratingFilter);
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setNameFilter(name);
        applyFilters(name, categoryFilter, ratingFilter);
    };

    // Aplicar filtros a las películas
    const applyFilters = (name, category, rating) => {
        let filtered = movies;

        if (name) {
            filtered = filtered.filter(movie => movie.nombre.toLowerCase().includes(name.toLowerCase()));
        }

        if (category) {
            filtered = filtered.filter(movie => movie.categoria.toLowerCase() === category.toLowerCase());
        }

        if (rating) {
            filtered = filtered.filter(movie => movie.rating >= rating);
        }

        setFilteredMovies(filtered);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Películas Disponibles</h1>

            <div className="row mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="col-md-4">
                    <select className="form-select" onChange={handleRatingChange}>
                        <option value="">Filtrar por Rating</option>
                        <option value="1">1 Estrella</option>
                        <option value="2">2 Estrellas</option>
                        <option value="3">3 Estrellas</option>
                        <option value="4">4 Estrellas</option>
                        <option value="5">5 Estrellas</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filtrar por Categoría"
                        onChange={handleCategoryChange}
                    />
                </div>
            </div>

            <Link to="/movies/add" className="btn btn-success mb-4">Añadir Nueva Película</Link>

            <div className="row">
                {filteredMovies.map(movie => (
                    <div key={movie.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img src={movie.imagen} className="card-img-top" alt={movie.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{movie.nombre}</h5>
                                <p className="card-text">{movie.resumen.slice(0, 100)}...</p>
                                <div className="row">
                                    <div className="col-12">
                                        <StarRatingComponent
                                            name="rating"
                                            starCount={5}
                                            value={movie.rating}
                                            editing={false} // Deshabilitar la edición de la calificación aquí
                                        />
                                    </div>
                                </div>
                                <Link to={`/movies/${movie.id}`} className="btn btn-primary mt-3">Ver Detalles</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
