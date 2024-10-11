import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir automáticamente a la lista de películas
    navigate('/movies');
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h1>Cargando la lista de películas...</h1>
    </div>
  );
}

export default Home;
