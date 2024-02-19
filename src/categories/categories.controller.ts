import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { PaginateOptions } from 'mongoose';
import { ModifyPaginationPipe } from 'src/common/pipes/modify-pagination.pipe';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoriesQueryDto } from './dto/get-category-query.dto';
import { ControllerReturnType } from 'src/common/common.interface';
import { MongooseExceptionFilter } from 'src/common/filters/mongoose-exception.filter';

@UseFilters(MongooseExceptionFilter)
@Controller('categories')
export class CategoriesController {
  //
  private _moduleName = 'category';

  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCategoryList(
    @Query(ModifyPaginationPipe) query: GetCategoriesQueryDto,
  ): ControllerReturnType {
    const { docs, ...paginateInfo } =
      await this.categoriesService.getCategoryList(
        query as unknown as PaginateOptions,
      );

    return {
      ok: true,
      data: docs,
      statusCode: HttpStatus.OK,
      pagination: paginateInfo,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() body: CreateCategoryDto): ControllerReturnType {
    const newCategory = await this.categoriesService.createCategory(body);

    return {
      ok: true,
      data: newCategory,
      statusCode: HttpStatus.CREATED,
      message: `new ${this._moduleName} created successfully`,
    };
  }

  @Put('/:categoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: UpdateCategoryDto,
  ): ControllerReturnType {
    const updatedCategory = await this.categoriesService.updateCategory(
      categoryId,
      body,
    );

    return {
      ok: true,
      data: updatedCategory,
      statusCode: HttpStatus.ACCEPTED,
      message: `${this._moduleName} with id ${updatedCategory._id} updated successfully`,
      metadata: { reqBody: body },
    };
  }

  @Delete('/:categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(
    @Param('categoryId') categoryId: string,
  ): ControllerReturnType {
    await this.categoriesService.deleteCategory(categoryId);

    return {
      ok: true,
      data: {},
      statusCode: HttpStatus.NO_CONTENT,
      message: `${this._moduleName} with id ${categoryId} deleted successfully`,
    };
  }
  //
}
