import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { PaginateOptions } from 'mongoose';
import { GetBrandsQueryDto } from 'src/brands/dto/get-brand-query.dto';
import { D_LIMIT, D_PAGE } from 'src/config/app.constants';

export class ModifyPaginationPipe
  implements PipeTransform<GetBrandsQueryDto, PaginateOptions>
{
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) return value;
    else
      return {
        ...value,
        page: value.page ? parseInt(value.page) : D_PAGE,
        limit: value.limit ? parseInt(value.limit) : D_LIMIT,
      };
  }
}
