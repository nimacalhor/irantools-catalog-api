import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { Brand } from 'src/brands/brands.schema';
import { Category } from 'src/categories/categories.schema';
import { Image } from 'src/images/images.schema';
import { ToolDetailInterface, ToolInterface } from './tools.interface';

@Schema()
export class ToolDetail implements ToolDetailInterface {
  @Prop({ required: false })
  weight?: string;

  @Prop({ required: false })
  amountInSet?: number;

  @Prop({ required: false })
  amountInBulk?: number;

  @Prop({ required: false })
  length?: string;

  @Prop({ required: false })
  material?: string;
}

@Schema()
export class Tool implements ToolInterface {
  @Prop({ required: true, max: 5, min: 1 })
  size: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop({
    required: false,
    validate: {
      validator: (value: string) => /^[0-9]+$/.test(value),
    },
  })
  price?: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Brand' })
  brand: Brand;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true })
  detail: ToolDetail;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Image' })
  image: Image;

  @Prop()
  description: string;

  @Prop({ required: true })
  available: boolean;
}

export type ToolDoc = HydratedDocument<Tool>;

export const toolSchema = SchemaFactory.createForClass(Tool);

try {
  toolSchema.plugin(paginate);
} catch (error) {}
