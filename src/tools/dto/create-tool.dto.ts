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

export class CreateToolDto
  implements
    Partial<OmitProperties<ToolInterface, 'brand' | 'category' | 'image'>>
{
  @IsNumber()
  @Min(1)
  @Max(5)
  size: number;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumberString()
  @IsOptional()
  price?: string;

  @IsString()
  brand: string;

  @IsString()
  category: string;

  detail: ToolDetailDto

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsBoolean()
  available: boolean;
}
