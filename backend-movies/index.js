const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { sequelize } = require('./config/database');  // Importamos la configuración de la DB
const movieRoutes = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');  // Middleware de manejo de errores

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para manejar CORS (permite que el frontend interactúe con el backend)
app.use(cors());

// Middleware para loguear las peticiones HTTP en la consola
app.use(morgan('dev'));

// Middleware para manejar JSON (para que Express entienda peticiones con cuerpo en JSON)
app.use(express.json());

// Probar la conexión con la base de datos PostgreSQL
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
        // Sincronizar modelos con la base de datos
        sequelize.sync({ force: false })  // Cambia 'force' a 'true' si quieres recrear las tablas
            .then(() => {
                console.log('Tablas sincronizadas en la base de datos');
            })
            .catch(err => {
                console.error('Error al sincronizar la base de datos:', err);
            });

    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });

// Definir las rutas del CRUD de películas
app.use('/api/movies', movieRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Películas!');
});

// Middleware de manejo de errores (debe ir al final para capturar los errores)
app.use(errorHandler);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
