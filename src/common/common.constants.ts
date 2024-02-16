import { HttpStatus } from '@nestjs/common';

export const ERROR_CODES = {
  DOC_NOT_FOUND: HttpStatus.NOT_FOUND + '1',
  INVALID_DOC: HttpStatus.BAD_REQUEST + '1',
  DOC_CAST_ERR: HttpStatus.BAD_REQUEST + '2',
};
