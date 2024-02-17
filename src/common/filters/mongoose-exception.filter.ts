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

    let errRes: ErrorReturnType;

    if (exception instanceof MongooseNativeError.ValidationError)
      errRes = this._handleValidationError(exception);
    //
    else if (exception instanceof MongooseNativeError.CastError)
      errRes = this._handleCastError(exception);

    response.status(HttpStatus.BAD_REQUEST).json(errRes);
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
