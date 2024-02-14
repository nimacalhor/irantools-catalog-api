import {
  Controller,
  Delete,
  FileTypeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  //
  constructor(private imagesService: ImagesService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const image = await this.imagesService.saveImage(file);
     
    return { ok: true, image };
  }

  @Delete('/:imageId')
  async deleteImage(@Param('imageId') imageId: string) {
    await this.imagesService.deleteImage(imageId);
    return { ok: true };
  }
  //
}
