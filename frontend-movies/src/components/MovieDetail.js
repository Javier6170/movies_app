import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';  // Importar la librería de estrellas


function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener detalles de la película por ID
        axios.get(`http://localhost:4000/api/movies/${id}`)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la película:', error);
            });
    }, [id]);

    // Eliminar la película
    const handleDelete = () => {
        axios.delete(`http://localhost:4000/api/movies/${id}`)
            .then(response => {
                console.log('Película eliminada:', response.data);
                navigate('/movies'); // Redirigir a la lista de películas
            })
            .catch(error => {
                console.error('Error al eliminar la película:', error);
            });
    };

    if (!movie) {
        return <div className="container text-center mt-5">Cargando...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={movie.imagen} alt={movie.nombre} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h1>{movie.nombre}</h1>
                    <p>{movie.resumen}</p>

                    <p><strong>Categoría:</strong> {movie.categoria}</p>
                    {/* Mostrar las estrellas de rating */}
                    <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={movie.rating}
                    />
                    {/* Botones de acciones */}
                    <div className="mt-3">
                        <button className="btn btn-warning me-2" onClick={() => navigate(`/movies/edit/${movie.id}`)}>
                            Editar
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
