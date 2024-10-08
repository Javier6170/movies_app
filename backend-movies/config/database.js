const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Crear una instancia de Sequelize y conectarse a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nombre de la base de datos
  process.env.DB_USER,     // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña del usuario
  {
    host: process.env.DB_HOST,   // Host donde se ejecuta la base de datos
    port: process.env.DB_PORT || 5432, // Puerto de PostgreSQL
    dialect: 'postgres',         // Indica que estamos utilizando PostgreSQL
    logging: false               // Desactiva el logging de SQL en la consola (opcional)
  }
);

module.exports = { sequelize };
