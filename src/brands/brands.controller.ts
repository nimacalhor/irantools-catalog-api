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
} from '@nestjs/common';
import { ModifyPaginationPipe } from 'src/common/pipes/modify-pagination.pipe';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetBrandsQueryDto } from './dto/get-brand-query.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PaginateOptions } from 'mongoose';

@Controller('brands')
export class BrandsController {
  //
  constructor(private brandsService: BrandsService) {}

  @Get()
  getBrandList(@Query(ModifyPaginationPipe) query: GetBrandsQueryDto) {
    return this.brandsService.getBrandList(query as unknown as PaginateOptions);
  }

  @Post()
  async createBrand(@Body() body: CreateBrandDto) {
    const newBrand = await this.brandsService.createBrand(body);
    return { ok: true, brand: newBrand };
  }

  @Put('/:brandId')
  async updateBrand(
    @Param('brandId') brandId: string,
    @Body() body: UpdateBrandDto,
  ) {
    debugger;
    const updatedBrand = await this.brandsService.updateBrand(brandId, body);
    debugger;
    return { ok: true, brand: updatedBrand };
  }

  @Delete('/:brandId')
  async deleteBrand(@Param('brandId') brandId) {
    await this.brandsService.deleteBrand(brandId);
    return { ok: true };
  }
}
