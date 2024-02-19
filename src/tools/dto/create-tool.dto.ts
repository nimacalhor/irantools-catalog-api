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

  @IsNumber()
  @ApiProperty({ required: false })
  @IsOptional()
  @Min(1)
  amountInSet?: number;

  @IsNumber()
  @ApiProperty({ required: false })
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

export class CreateToolDto
  implements
    Partial<OmitProperties<ToolInterface, 'brand' | 'category' | 'image'>>
{
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  size: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  price?: string;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty({ required: false })
  @IsOptional()
  detail: ToolDetailDto;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsBoolean()
  available: boolean;
}
