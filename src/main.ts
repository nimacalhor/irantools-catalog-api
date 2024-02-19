import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongooseExceptionFilter } from './common/filters/mongoose-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyGuard } from './common/guards/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new MongooseExceptionFilter());
  app.useGlobalGuards(new ApiKeyGuard())
  app.enableCors({ origin: ['http://127.0.0.1:4000'] });
  await app.listen(3000);
}
bootstrap();
