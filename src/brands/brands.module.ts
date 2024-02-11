import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema, Brand } from './brands.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Brand.name,
        useFactory() {
          const schema = BrandSchema;
          schema.plugin(require("mongoose-paginate-v2"));
          return schema;
        },
      },
    ]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
