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
import { ApiProperty } from '@nestjs/swagger';

type OmitProperties<T, K extends keyof T> = Omit<T, K>;

class ToolDetailDto implements Partial<ToolDetailInterface> {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  weight?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  amountInSet?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(1)
  amountInBulk?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  length?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  material?: string;
}

export class UpdateToolDto
  implements
    Partial<OmitProperties<ToolInterface, 'brand' | 'category' | 'image'>>
{
  @ApiProperty({ required: false })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  size: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  price?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  brand: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty({ required: false })
  @IsOptional()
  detail: ToolDetailDto;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  available: boolean;
}
