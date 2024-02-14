import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { Image } from 'src/images/images.schema';

@Schema()
export class Category {
  @Prop({ type: String })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Image' })
  image: Image;
}

const categorySchema = SchemaFactory.createForClass(Category);
try {
  categorySchema.plugin(paginate);
} catch (error) {}

export { categorySchema };

export type CategoryDoc = HydratedDocument<Category>;
