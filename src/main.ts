import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Drug-Speak API')
    .setDescription('API documentation for the Drug-Speak server')
    .setVersion('1.0')
    // Optionally add authentication support
    .addBearerAuth()
    .build();

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger module at the /api path
  SwaggerModule.setup('api-doc', app, document);

  // Access the underlying Express instance
  const server = app.getHttpAdapter().getInstance();

  // Redirect the root path to the Swagger UI
  server.get('/', (_: any, res: { redirect: (arg0: string) => void }) => {
    res.redirect('/api-doc');
  });

  await app.listen(3000);
}
bootstrap();
