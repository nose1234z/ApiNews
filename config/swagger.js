const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI
    info: {
      title: 'API de Noticias de México', // Título de tu API
      version: '1.0.0', // Versión de tu API
      description: 'API RESTful para la gestión de noticias, categorías, estados y usuarios. Incluye autenticación JWT y control de roles.', // Descripción de tu API
      contact: {
        name: 'Tu Nombre/Equipo',
        email: 'tu_email@example.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1', // URL base de tu API
        description: 'Servidor de Desarrollo Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce tu token JWT aquí (ej. Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)',
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Aplica la seguridad por defecto a todas las rutas que lo necesiten
      },
    ],
  },
  // Rutas donde swagger-jsdoc buscará los comentarios de documentación
  apis: [
    './routes/*.js',       // Para tus archivos de rutas principales (ej. user.router.js, news.router.js)
    './models/*.js',       // Para documentar los esquemas de tus modelos
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;