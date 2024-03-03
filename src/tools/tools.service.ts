import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tool } from './tools.schema';
import { FilterQuery, PaginateModel, PaginateOptions } from 'mongoose';
import { ImagesService } from 'src/images/images.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { DocNotFoundException } from 'src/common/exceptions/doc-not-found.exception';
import { ObjectId } from 'mongodb';

@Injectable()
export class ToolsService {
  //
  private _toolPopulate = ['image', 'brand', 'category'];

  constructor(
    @InjectModel(Tool.name) private toolModel: PaginateModel<Tool>,
    private imageService: ImagesService,
  ) {}
  //
  async createTool(createToolData: CreateToolDto) {
    const { image } = createToolData;
    const doseImageExists = await this.imageService.isValid(image);
    if (!doseImageExists) throw new DocNotFoundException('Image', image);
    const newTool = new this.toolModel(createToolData);
    return (await newTool.save()).populate(this._toolPopulate);
  }

  async deleteTool(toolId: string) {
    const tool = await this.toolModel.findById(toolId);

    if (!tool) throw new DocNotFoundException(Tool.name, toolId);
    await this.imageService.deleteImage(tool.image as unknown as string);
    return await this.toolModel.findByIdAndDelete(toolId);
  }

  async updateTool(id: string, updateToolData: UpdateToolDto) {
    if (!updateToolData.image) {
      const newTool = await this.toolModel.findByIdAndUpdate(
        id,
        updateToolData,
        {
          runValidators: true,
          new: true,
          populate: this._toolPopulate,
        },
      );
      if (!newTool) throw new DocNotFoundException(Tool.name, id);

      return newTool;
    }

    const doseImageExists = await this.imageService.isValid(
      updateToolData.image,
    );
    if (!doseImageExists)
      throw new DocNotFoundException('Image', updateToolData.image);

    const oldTool = await this.toolModel.findById(id);
    if (!oldTool) throw new DocNotFoundException(Tool.name, id);

    const newTool = await this.toolModel.findByIdAndUpdate(id, updateToolData, {
      runValidators: true,
      new: true,
      populate: this._toolPopulate,
    });

    await this.imageService.deleteImage(oldTool.image as unknown as string);
    return newTool;
  }

  getToolList(query: FilterQuery<Tool> = {}, paginateOptions?: PaginateOptions) {
    return this.toolModel.paginate(query, {
      ...paginateOptions,
      populate: this._toolPopulate,
    });
  }

  async getTool(toolId: string) {
    const tool = await this.toolModel
      .findById(toolId)
      .populate(this._toolPopulate);
    if (!tool) throw new DocNotFoundException(Tool.name, toolId);
    return tool;
  }

  async deleteToolsBrand(brandId: string | ObjectId) {
    await this.toolModel.updateMany({ brand: brandId }, { brand: null });
    return;
  }

  async deleteToolsCategory(categoryId: string | ObjectId) {
    await this.toolModel.updateMany(
      { category: categoryId },
      { category: null },
    );
    return;
  }

  //
}
