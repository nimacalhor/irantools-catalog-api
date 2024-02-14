import { IsString } from 'class-validator';


export class CreateBrandDto {
  @IsString()
  title: string;

  @IsString()
  image: string;
}
