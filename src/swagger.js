const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API',
        },
    },
    apis: ['./routes/*.js'], // Đường dẫn tới các file mô tả API
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
