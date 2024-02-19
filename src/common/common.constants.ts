import { HttpStatus } from '@nestjs/common';

export const ERROR_CODES = {
  DOC_NOT_FOUND: HttpStatus.NOT_FOUND + '1',

  INVALID_DOC: HttpStatus.BAD_REQUEST + '1',
  DOC_CAST_ERR: HttpStatus.BAD_REQUEST + '2',
  DUPLICATE_KEY: HttpStatus.BAD_REQUEST + '3',
  INVALID_BODY: HttpStatus.BAD_REQUEST + '4',
  
  SERVER_ERROR: HttpStatus.INTERNAL_SERVER_ERROR + '1',
  UNKNOWN_MONGO_ERROR: HttpStatus.INTERNAL_SERVER_ERROR + '2',
};

(function validateErrorCodes(obj: Record<string, string>): void {
  const valuesSet = new Set<string>();

  for (const value of Object.values(obj)) {
    if (valuesSet.has(value)) {
      throw new Error(`error in ERROR_CODES; Duplicate value found: ${value}`);
    }
    valuesSet.add(value);
  }
})(ERROR_CODES);
