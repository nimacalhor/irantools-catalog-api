import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './brands.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetBrandsQueryDto } from './dto/get-brand-query.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';


@Injectable()
export class BrandsService {
  //
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
  ) {}
  //
  createBrand(createBrandData: CreateBrandDto) {
    const newBrand = new this.brandModel(createBrandData);
    return newBrand.save();
  }

  deleteBrand(brandId: string) {
    return this.brandModel.findByIdAndDelete(brandId);
  }

  updateBrand(id: string, updateBrandData: UpdateBrandDto) {
    return this.brandModel.findByIdAndUpdate(id, updateBrandData, {
      runValidators: true,
      new: true,
    });
  }

  getBrandList(paginateOptions?: GetBrandsQueryDto) {
    return (this.brandModel as any).paginate({}, paginateOptions);
  }
  //
}
