import {
  IsBoolean,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ToolDetailInterface, ToolInterface } from '../tools.interface';

type OmitProperties<T, K extends keyof T> = Omit<T, K>;

class ToolDetailDto implements Partial<ToolDetailInterface> {
  @IsString()
  @IsOptional()
  weight?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  amountInSet?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  amountInBulk?: number;

  @IsString()
  @IsOptional()
  length?: string;

  @IsString()
  @IsOptional()
  material?: string;
}

export class UpdateToolDto
  implements
    Partial<OmitProperties<ToolInterface, 'brand' | 'category' | 'image'>>
{
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  size: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsNumberString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsOptional()
  detail: ToolDetailDto;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}
