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
import { MongoError } from 'mongodb';

@Catch(MongoError, MongooseError)
export class MongooseExceptionFilter
  implements ExceptionFilter<MongooseError | MongooseNativeError>
{
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errRes: ErrorReturnType = {
      data: {},
      errorCode: ERROR_CODES.SERVER_ERROR,
      errorMessage: 'unknown error',
      ok: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof MongooseNativeError.ValidationError)
      errRes = this._handleValidationError(exception);
    //
    else if (exception instanceof MongooseNativeError.CastError)
      errRes = this._handleCastError(exception);
    else if (
      exception instanceof MongooseNativeError.MongooseServerSelectionError
    )
      debugger;

    debugger;
    if (!errRes)
      throw new BadRequestException({
        data: {},
        errorCode: ERROR_CODES.SERVER_ERROR,
        errorMessage: 'unkown',
      } as ErrorReturnType);

    response.status(HttpStatus.BAD_REQUEST).json(errRes);
  }

  private _handleValidationError(
    err: MongooseNativeError.ValidationError,
  ): ErrorReturnType {
    debugger;
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
    debugger;
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
