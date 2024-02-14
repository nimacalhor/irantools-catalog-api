import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Model,
  PaginateModel,
  PaginateOptions,
  isValidObjectId,
} from 'mongoose';
import { Brand } from './brands.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetBrandsQueryDto } from './dto/get-brand-query.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class BrandsService {
  //
  constructor(
    @InjectModel(Brand.name) private brandModel: PaginateModel<Brand>,
    private imageService: ImagesService,
  ) {}
  //
  createBrand(createBrandData: CreateBrandDto) {
    const newBrand = new this.brandModel(createBrandData);
    return newBrand.save();
  }

  async deleteBrand(brandId: string) {
    const brand = await this.brandModel.findById(brandId);
     
    if (!brand)
      throw new NotFoundException(`no brand found with id ${brandId}`);
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
        },
      );
      if (!newBrand)
        throw new NotFoundException(`no brand found with id ${id}`);
       
      return newBrand;
    }
    // 90881

    const oldBrand = await this.brandModel.findById(id);
    if (!oldBrand) throw new NotFoundException(`no brand found with id ${id}`);

    const newBrand = await this.brandModel.findByIdAndUpdate(
      id,
      updateBrandData,
      { runValidators: true, new: true },
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
