import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import mongoDBConfig from './config/mongoDB.config';
import { ImagesModule } from './images/images.module';
import { ToolsModule } from './tools/tools.module';

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
