import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { GlobalExceptionFilter } from './filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';

const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug', 'verbose'] });

  // Global Validation Pipe 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Global Interceptor & Exception Filter
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  // CORS 설정
  app.use(cors({
    origin: ['http://localhost:3000', 'https://yoyaklery.site'],
    methods: 'GET, POST, DELETE, PATCH, PUT, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  }));

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Yoyaklary API') 
    .setDescription('Yoyaklary의 NestJS API 문서')  
    .setVersion('1.0')  
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'JWT 토큰을 입력하세요',
    }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const domain = process.env.APP_DOMAIN || 'http://localhost';
  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, () => {
    Logger.log(`Application is running on: ${domain}:${port}`, 'Bootstrap');
  });
}

bootstrap();