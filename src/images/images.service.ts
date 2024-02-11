import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { Image } from './images.schema';

@Injectable()
export class ImagesService {
  //
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  saveImage(file: Express.Multer.File){

  }

  private saveFile(file:Express.Multer.File){
    
  }
  //
}
