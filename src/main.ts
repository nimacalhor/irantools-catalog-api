import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './common/filters/mongoose-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { ErrorReturnType } from './common/common.interface';
import { ERROR_CODES } from './common/common.constants';
import { CustomValidationPipe } from './common/pipes/global-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new MongooseExceptionFilter());
  app.useGlobalGuards(new ApiKeyGuard());
  app.enableCors({ origin: ['http://127.0.0.1:4000'] });
  await app.listen(4000);
}
bootstrap();
