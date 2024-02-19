import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './categories.schema';
import { PaginateModel, PaginateOptions } from 'mongoose';
import { ImagesService } from 'src/images/images.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DocNotFoundException } from 'src/common/exceptions/doc-not-found.exception';

@Injectable()
export class CategoriesService {
  //
  constructor(
    @InjectModel(Category.name) private categoryModel: PaginateModel<Category>,
    private imageService: ImagesService,
  ) {}

  async createCategory(createCategoryData: CreateCategoryDto) {
    const { image } = createCategoryData;
    const doseImageExists = await this.imageService.isValid(image);
    if (!doseImageExists) throw new DocNotFoundException('Image', image);
    const newCategory = new this.categoryModel(createCategoryData);
    return (await newCategory.save()).populate('image');
  }

  async deleteCategory(categoryId: string) {
    const category = await this.categoryModel.findById(categoryId);

    if (!category) throw new DocNotFoundException(Category.name, categoryId);
    await this.imageService.deleteImage(category.image as unknown as string);
    return await this.categoryModel.findByIdAndDelete(categoryId);
  }

  async updateCategory(id: string, updateCategoryData: UpdateCategoryDto) {
    if (!updateCategoryData.image) {
      const newCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryData,
        {
          runValidators: true,
          new: true,
          populate: 'image',
        },
      );
      if (!newCategory) throw new DocNotFoundException(Category.name, id);

      return newCategory;
    }

    const doseImageExists = await this.imageService.isValid(
      updateCategoryData.image,
    );
    if (!doseImageExists)
      throw new DocNotFoundException('Image', updateCategoryData.image);

    const oldCategory = await this.categoryModel.findById(id);
    if (!oldCategory) throw new DocNotFoundException(Category.name, id);

    const newCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryData,
      { runValidators: true, new: true, populate: 'image' },
    );

    await this.imageService.deleteImage(oldCategory.image as unknown as string);
    return newCategory;
  }

  getCategoryList(paginateOptions?: PaginateOptions) {
    return this.categoryModel.paginate(
      {},
      { ...paginateOptions, populate: 'image' },
    );
  }
  //
}
