import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;
}

const BrandSchema = SchemaFactory.createForClass(Brand);

export { BrandSchema };

