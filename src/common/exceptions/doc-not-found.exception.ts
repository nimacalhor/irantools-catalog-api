import { HttpStatus, NotFoundException } from '@nestjs/common';
import { ErrorReturnType } from '../common.interface';
import { ERROR_CODES } from '../common.constants';

export class DocNotFoundException extends NotFoundException {
  constructor(modelName: string, id: string) {
    const body: ErrorReturnType = {
      data: { modelName, id },
      errorCode: ERROR_CODES.DOC_NOT_FOUND,
      errorMessage: `${modelName} with id ${id} did not found`,
      ok: false,
      statusCode: HttpStatus.NOT_FOUND,
    };
    super(body);
  }
}
