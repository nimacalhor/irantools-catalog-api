import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { D_LIMIT, D_PAGE } from 'src/config/app.constants';

export class GetToolsQueryDto {
  //
  @ApiProperty({ default: D_LIMIT + '' })
  @IsNumberString()
  @IsOptional()
  limit?: string = D_LIMIT + '';

  @ApiProperty({ default: D_PAGE + '' })
  @IsNumberString()
  @IsOptional()
  page?: string = D_PAGE + '';

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  select?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sort?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  populate?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  category?: string;

  //
}
