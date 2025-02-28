import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const domain = process.env.APP_DOMAIN || 'http://localhost';
  const port = process.env.PORT || 3000;
  console.log(`${port}번 포트에서 대기 중`);

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
    .addBearerAuth(  
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',  
        name: 'Authorization',
        description: 'JWT 토큰을 입력하세요',
        in: 'header',
      },
      'access-token',  
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('yoyaklary', app, document); 


  await app.listen(port, () => {
    console.log(`Application is running on: ${domain}:${port}`);
  });
}
bootstrap();
