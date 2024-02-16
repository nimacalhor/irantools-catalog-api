import {
  Controller,
  Delete,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { ControllerReturnType } from 'src/common/common.interface';

@Controller('images')
export class ImagesController {
  //
  private _moduleName = 'image';

  constructor(private imagesService: ImagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    file: Express.Multer.File,
  ): ControllerReturnType {
    const image = await this.imagesService.saveImage(file);

    return {
      ok: true,
      data: image,
      statusCode: HttpStatus.CREATED,
      message: `${this._moduleName} uploaded successfully`,
    };
  }

  @Delete('/:imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImage(@Param('imageId') imageId: string): ControllerReturnType {
    await this.imagesService.deleteImage(imageId);
    return {
      ok: true,
      data: {},
      statusCode: HttpStatus.NO_CONTENT,
      message: `${this._moduleName} deleted successfully`,
    };
  }
  //
}
