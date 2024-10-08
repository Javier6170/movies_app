const { body, validationResult } = require('express-validator');

// Validar campos para crear o actualizar una película
const validateMovie = [
  body('nombre')
    .notEmpty().withMessage('El nombre de la película es obligatorio')
    .isString().withMessage('El nombre debe ser un texto'),
  
  body('resumen')
    .notEmpty().withMessage('El resumen es obligatorio')
    .isString().withMessage('El resumen debe ser un texto'),

  body('rating')
    .notEmpty().withMessage('El rating es obligatorio')
    .isInt({ min: 1, max: 5 }).withMessage('El rating debe ser un número entre 1 y 5'),

  body('categoria')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isString().withMessage('La categoría debe ser un texto'),

  // Manejar los errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Si no hay errores, pasar al siguiente middleware o controlador
  }
];

module.exports = validateMovie;
