// src/common/filters/mongoose-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { MongooseError, Error as MongooseNativeError } from 'mongoose';
import { Response } from 'express';

@Catch(MongooseError, MongooseNativeError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError | MongooseNativeError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let message = 'Internal Server Error';
    let details: any;

    if (exception instanceof MongooseNativeError.ValidationError) {
      statusCode = 400;
      message = 'Validation Error';
      details = exception.errors; // Extract validation errors
    }
    //
    else if (exception instanceof MongooseNativeError.CastError) {
      statusCode = 400;
      message = 'Invalid Cast';
      details = { path: exception.path, value: exception.value }; // Extract cast details
    }
    //
    else if (exception instanceof MongooseNativeError.DocumentNotFoundError) {
      statusCode = 404;
      message = 'Document Not Found';
      details = { ...exception }; // Extract document details
    }
    //

    response.status(statusCode).json({
      statusCode,
      message,
      details,
    });
  }
}
