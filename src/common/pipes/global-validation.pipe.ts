// custom-validation.pipe.ts

import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ERROR_CODES } from '../common.constants';
import { ErrorReturnType } from '../common.interface';

export type Errs = {
  target: {
    limit: string;
    page: string;
  };
  value: string;
  property: string;
  children: Array<any>;
  constraints: {
    isNumberString: string;
  };
};

export class CustomValidationPipe extends ValidationPipe {
  //
  constructor(...args: any[]) {
    super(...args, {
      //
      exceptionFactory(errors: Errs[]) {
        debugger;
        const returnValue: ErrorReturnType = {
          data: {
            paths: errors.map((err) => err.property),
          },
          errorCode: ERROR_CODES.INVALID_BODY,
          statusCode: HttpStatus.BAD_REQUEST,
          errorMessage: getMessage(errors),
          ok: false,
        };

        throw new BadRequestException(returnValue);

        function getMessage(errors: any[]) {
          const errorMessages = errors
            .map((error) => {
              // Assuming 'constraints' property is always present
              const constraints = error.constraints || {};

              // Extracting values from the constraints object
              const messages = Object.values(constraints);

              return messages.join(', ');
            })
            .join('; ');

          return errorMessages;
        }
      },
    });
  }
}
