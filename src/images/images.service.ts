import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { Image } from './images.schema';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
  //
  constructor(@InjectModel(Image.name) private repo: Model<Image>) {}

  async saveImage(file: Express.Multer.File) {
    const path = await this._saveFile(file);
    const imageDoc = await this._saveToDB(path);

    return imageDoc;
  }

  async deleteImage(imageId: string) {
    const image = await this.repo.findById(imageId);
    if (!image) return;
    await this._removeFile(image.path);
    return await this.repo.findByIdAndDelete(imageId);
  }

  async isValid(imageId?: string) {
    if (!imageId) return false;
    const image = await this.repo.findById(imageId);
    return !!image;
  }

  private async _saveFile(file: Express.Multer.File) {
    const uniqueFileName = `${Date.now()}-${uuidv4()}.${file.originalname.split('.').pop()}`;
    const filePath = join('public/images', uniqueFileName);

    // Check if the 'public' directory exists, create it if not
    if (!existsSync('public')) {
      mkdirSync('public');
    }

    // Write the file to the public directory
    writeFileSync(filePath, file.buffer);

    return `images/${uniqueFileName}`;
  }

  private _removeFile(filePath: string) {
    return new Promise((resolve, reject) => {
      const fullPath = join('public', filePath);

      // Check if the file exists
      if (!existsSync(fullPath)) return resolve(true);

      // Remove the file
      unlinkSync(fullPath);

      resolve(true);
    });
  }

  private async _saveToDB(filePath: string) {
    const newImage = new this.repo({ path: filePath });
    await newImage.save();
    return newImage;
  }
  //
}
