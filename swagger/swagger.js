const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const options = {
  info: {
    title: 'yoyaklery',
    description: 'yoyaklery API 명세서',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
    {
      url: 'https://api.yoyaklery.site',
      description: 'Production server',
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
    },
  },
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./src/main.ts']; 

swaggerAutogen(outputFile, endpointsFiles, options).then(() => {
  console.log('Swagger JSON 생성 완료');
});
