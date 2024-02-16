import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ModifyPaginationPipe } from 'src/common/pipes/modify-pagination.pipe';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetBrandsQueryDto } from './dto/get-brand-query.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PaginateOptions } from 'mongoose';
import { ControllerReturnType } from 'src/common/common.interface';

@Controller('brands')
export class BrandsController {
  //
  constructor(private brandsService: BrandsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBrandList(
    @Query(ModifyPaginationPipe) query: GetBrandsQueryDto,
  ): ControllerReturnType {
    const { docs, ...paginateInfo } = await this.brandsService.getBrandList(
      query as unknown as PaginateOptions,
    );
    return {
      data: docs,
      ok: true,
      statusCode: HttpStatus.OK,
      pagination: paginateInfo,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBrand(@Body() body: CreateBrandDto): ControllerReturnType {
    const newBrand = await this.brandsService.createBrand(body);
    return {
      ok: true,
      data: newBrand,
      statusCode: HttpStatus.CREATED,
      message: `new brand created successfully 😊`,
    };
  }

  @Put('/:brandId')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateBrand(
    @Param('brandId') brandId: string,
    @Body() body: UpdateBrandDto,
  ): ControllerReturnType {
    const updatedBrand = await this.brandsService.updateBrand(brandId, body);

    return {
      ok: true,
      data: updatedBrand,
      statusCode: HttpStatus.ACCEPTED,
      message: `brand with id ${updatedBrand._id} updated successfully`,
      metadata: { reqBody: body },
    };
  }

  @Delete('/:brandId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBrand(@Param('brandId') brandId: string): ControllerReturnType {
    await this.brandsService.deleteBrand(brandId);
    return {
      ok: true,
      data: {},
      statusCode: HttpStatus.NO_CONTENT,
      message: `brand with id ${brandId} deleted successfully`,
    };
  }
}
