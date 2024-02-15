import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'image document ObjectId' })
  @IsString()
  image: string;
}
