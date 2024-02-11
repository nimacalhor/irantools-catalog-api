import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ToolsModule } from './tools/tools.module';
import { ImagesModule } from './images/images.module';
import mongoDBConfig from './config/mongoDB.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => mongoDBConfig(),
    }),
    BrandsModule,
    CategoriesModule,
    ToolsModule,
    ImagesModule,
  ],
})
export class AppModule {}
