import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors(['https://nexus-wear-dashboard.vercel.app']);
  app.enableCors({
    origin: [
      'https://nexus-wear-dashboard.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nexus Wear Backend')
    .setDescription('The Nexus Wear API description')
    .setVersion('1.0')
    .addTag('nexus-wear')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const DocumentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, DocumentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
