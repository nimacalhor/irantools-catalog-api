import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ToolsModule } from './tools/tools.module';
import { ImagesModule } from './images/images.module';
import mongoDBConfig from './config/mongoDB.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => mongoDBConfig(),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    BrandsModule,
    CategoriesModule,
    ToolsModule,
    ImagesModule,
  ],
})
export class AppModule {}
