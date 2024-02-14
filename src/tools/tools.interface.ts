import { Brand } from 'src/brands/brands.schema';
import { Category } from 'src/categories/categories.schema';
import { Image } from 'src/images/images.schema';

export interface ToolDetailInterface {
  weight?: string;
  amountInSet?: number;
  amountInBulk?: number;
  length?: string;
  material?: string;
}

export interface ToolInterface {
  size: number;
  name: string;
  code: string;
  price?: string;
  brand: Brand;
  category: Category;
  detail: ToolDetailInterface;
  image: Image;
  description: string;
  available: boolean;
}
