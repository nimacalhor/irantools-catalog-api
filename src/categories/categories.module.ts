import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './categories.service';
import { Category, categorySchema } from './categories.schema';
import { ImagesModule } from 'src/images/images.module';
import { ToolsModule } from 'src/tools/tools.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory() {
          const schema = categorySchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
    ImagesModule,
    ToolsModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
