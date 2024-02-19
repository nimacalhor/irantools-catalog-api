import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateOptions } from 'mongoose';
import { DocNotFoundException } from 'src/common/exceptions/doc-not-found.exception';
import { ImagesService } from 'src/images/images.service';
import { Brand } from './brands.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  //
  constructor(
    @InjectModel(Brand.name) private brandModel: PaginateModel<Brand>,
    private imageService: ImagesService,
  ) {}
  //
  async createBrand(createBrandData: CreateBrandDto) {
    const { image } = createBrandData;
    const doseImageExists = await this.imageService.isValid(image);
    if (!doseImageExists) throw new DocNotFoundException('Image', image);
    const newBrand = new this.brandModel(createBrandData);
    return (await newBrand.save()).populate('image');
  }

  async deleteBrand(brandId: string) {
    const brand = await this.brandModel.findById(brandId);

    if (!brand) throw new DocNotFoundException(Brand.name, brandId);
    await this.imageService.deleteImage(brand.image as unknown as string);
    return await this.brandModel.findByIdAndDelete(brandId);
  }

  async updateBrand(id: string, updateBrandData: UpdateBrandDto) {
    if (!updateBrandData.image) {
      const newBrand = await this.brandModel.findByIdAndUpdate(
        id,
        updateBrandData,
        {
          runValidators: true,
          new: true,
          populate: 'image',
        },
      );
      if (!newBrand) throw new DocNotFoundException(Brand.name, id);

      return newBrand;
    }
    const doseImageExists = await this.imageService.isValid(
      updateBrandData.image,
    );
    if (!doseImageExists)
      throw new DocNotFoundException('Image', updateBrandData.image);

    const oldBrand = await this.brandModel.findById(id);
    if (!oldBrand) throw new DocNotFoundException(Brand.name, id);

    const newBrand = await this.brandModel.findByIdAndUpdate(
      id,
      updateBrandData,
      { runValidators: true, new: true, populate: 'image' },
    );

    await this.imageService.deleteImage(oldBrand.image as unknown as string);
    return newBrand;
  }

  getBrandList(paginateOptions?: PaginateOptions) {
    return this.brandModel.paginate(
      {},
      { ...paginateOptions, populate: 'image' },
    );
  }
  //
}
