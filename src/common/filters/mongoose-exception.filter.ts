// src/common/filters/mongoose-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { MongooseError, Error as MongooseNativeError } from 'mongoose';
import { Response } from 'express';
import { ErrorReturnType } from '../common.interface';
import { ERROR_CODES } from '../common.constants';

@Catch(MongooseError, MongooseNativeError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError | MongooseNativeError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let message = 'Internal Server Error';

    if (exception instanceof MongooseNativeError.ValidationError) {
      statusCode = 400;
      message = 'Validation Error';
    }
    //
    else if (exception instanceof MongooseNativeError.CastError) {
      statusCode = 400;
      message = 'Invalid Cast';
    }

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }

  private _handleValidationError(
    err: MongooseNativeError.ValidationError,
  ): ErrorReturnType {
    const { errors } = err;
    const result: ErrorReturnType = {
      ok: false,
      data: errors,
      errorCode: ERROR_CODES.INVALID_DOC,
      errorMessage: `validation error while validating doc`,
      statusCode: HttpStatus.BAD_REQUEST,
    };
    return result;
  }

  private _handleCastError(
    err: MongooseNativeError.CastError,
  ): ErrorReturnType {
    const result: ErrorReturnType = {
      ok: false,
      data: err,
      errorCode: ERROR_CODES.DOC_CAST_ERR,
      errorMessage: `cast error while validating doc`,
      statusCode: HttpStatus.BAD_REQUEST,
    };
    return result;
  }
}
