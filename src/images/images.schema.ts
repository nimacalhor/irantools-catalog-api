import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Image {
  @Prop({ required: true })
  path: string;
}

export type ImageDocument = HydratedDocument<Image>;

export const imageSchema = SchemaFactory.createForClass(Image);
