const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Configurar Cloudinary con las credenciales desde el archivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Subir una imagen a Cloudinary
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'movies', // Carpeta donde almacenar las imágenes
      use_filename: true
    });
    return result.secure_url;  // Devolver la URL segura de la imagen
  } catch (err) {
    throw new Error('Error al subir la imagen');
  }
};

module.exports = {
  uploadImage
};
