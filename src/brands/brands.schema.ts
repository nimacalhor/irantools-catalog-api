import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Image } from 'src/images/images.schema';
import paginate from 'mongoose-paginate-v2';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Image' })
  image: Image;
}

const BrandSchema = SchemaFactory.createForClass(Brand);
try {
  BrandSchema.plugin(paginate);
} catch (error) {}

export { BrandSchema };
