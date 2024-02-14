import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { D_LIMIT, D_PAGE } from 'src/config/app.constants';

export class GetToolsQueryDto {
  //
  @IsNumberString()
  @IsOptional()
  limit?: string = D_LIMIT + '';

  @IsNumberString()
  @IsOptional()
  page?: string = D_PAGE + '';

  @IsString()
  @IsOptional()
  select?: string;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  populate?: string;
  //
}
