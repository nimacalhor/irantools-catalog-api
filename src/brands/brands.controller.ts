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

@Controller('brands')
export class BrandsController {
  //
  constructor(private brandsService: BrandsService) {}

  @Get()
  getBrandList(
    @Query(ValidationPipe, ModifyPaginationPipe) query: GetBrandsQueryDto,
  ) {
    return this.brandsService.getBrandList(query);
  }

  @Post()
  async createBrand(@Body(ValidationPipe) body: CreateBrandDto) {
    const newBrand = await this.brandsService.createBrand(body);
    return { ok: true, brand: newBrand };
  }

  @Put('/:brandId')
  async updateBrand(
    @Param('brandId') brandId: string,
    @Body(ValidationPipe) body: UpdateBrandDto,
  ) {
    const updatedBrand = await this.brandsService.updateBrand(brandId, body);
    return { ok: true, brand: updatedBrand };
  }

  @Delete('/:brandId')
  async deleteBrand(@Param('brandId') brandId) {
    await this.brandsService.deleteBrand(brandId);
    return { ok: true };
  }
}
