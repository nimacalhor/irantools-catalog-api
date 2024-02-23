import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema, Brand } from './brands.schema';
import { ImagesModule } from 'src/images/images.module';
import { ToolsModule } from 'src/tools/tools.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Brand.name,
        useFactory() {
          const schema = BrandSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
    ImagesModule,
    ToolsModule
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
