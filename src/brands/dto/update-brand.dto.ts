import { IsString, IsOptional } from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  image: string;
}
