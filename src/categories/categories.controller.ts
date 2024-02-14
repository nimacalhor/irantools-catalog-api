import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginateOptions } from 'mongoose';
import { ModifyPaginationPipe } from 'src/common/pipes/modify-pagination.pipe';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoriesQueryDto } from './dto/get-category-query.dto';

@Controller('categories')
export class CategoriesController {
  //

  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategoryList(@Query(ModifyPaginationPipe) query: GetCategoriesQueryDto) {
    return this.categoriesService.getCategoryList(
      query as unknown as PaginateOptions,
    );
  }

  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    const newCategory = await this.categoriesService.createCategory(body);
    return { ok: true, category: newCategory };
  }

  @Put('/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: UpdateCategoryDto,
  ) {
     
    const updatedCategory = await this.categoriesService.updateCategory(
      categoryId,
      body,
    );
     
    return { ok: true, category: updatedCategory };
  }

  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId) {
    await this.categoriesService.deleteCategory(categoryId);
    return { ok: true };
  }
  //
}
