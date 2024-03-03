import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { MongooseError, Error as MongooseNativeError } from 'mongoose';
import { Response } from 'express';
import { ErrorReturnType } from '../common.interface';
import { ERROR_CODES } from '../common.constants';
import { MongoError, MongoServerError } from 'mongodb';

@Catch(MongoError, MongooseError)
export class MongooseExceptionFilter
  implements ExceptionFilter<MongooseError | MongooseNativeError>
{
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errRes: ErrorReturnType = this._getDefaultErrRes();

    if (exception instanceof MongooseNativeError.ValidationError)
      errRes = this._handleValidationError(exception);
    //
    else if (exception instanceof MongooseNativeError.CastError)
      errRes = this._handleCastError(exception);
    //
    else if (exception instanceof MongoServerError)
      errRes = this._handleMongoError(exception);

     
    if (!errRes) throw this._getDefaultErr();

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

  private _handleMongoError(err: MongoServerError): ErrorReturnType {
    const { message } = err;
    return {
      data: { keyValues: Object.values(err.keyValue) },
      errorCode: ERROR_CODES.DUPLICATE_KEY,
      errorMessage: `${message}`,
      ok: false,
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  private _getDefaultErr() {
    return new BadRequestException({
      data: {},
      errorCode: ERROR_CODES.UNKNOWN_MONGO_ERROR,
      errorMessage: 'unknown Mongo/Mongoose error',
    } as ErrorReturnType);
  }

  private _getDefaultErrRes() {
    return {
      data: {},
      errorCode: ERROR_CODES.SERVER_ERROR,
      errorMessage: 'unknown error',
      ok: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
