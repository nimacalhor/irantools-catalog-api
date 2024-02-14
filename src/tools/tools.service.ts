import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tool } from './tools.schema';
import { PaginateModel, PaginateOptions } from 'mongoose';
import { ImagesService } from 'src/images/images.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Injectable()
export class ToolsService {
  //
  private _toolPopulate = ['image', 'brand', 'category'];

  constructor(
    @InjectModel(Tool.name) private toolModel: PaginateModel<Tool>,
    private imageService: ImagesService,
  ) {}
  //
  createTool(createToolData: CreateToolDto) {
    const newTool = new this.toolModel(createToolData);
    return newTool.save();
  }

  async deleteTool(toolId: string) {
    const tool = await this.toolModel.findById(toolId);

    if (!tool) throw new NotFoundException(this._getNotFoundErrMsg(toolId));
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
        },
      );
      if (!newTool) throw new NotFoundException(this._getNotFoundErrMsg(id));

      return newTool;
    }
    // 90881

    const oldTool = await this.toolModel.findById(id);
    if (!oldTool) throw new NotFoundException(this._getNotFoundErrMsg(id));

    const newTool = await this.toolModel.findByIdAndUpdate(id, updateToolData, {
      runValidators: true,
      new: true,
    });

    await this.imageService.deleteImage(oldTool.image as unknown as string);
    return newTool;
  }

  getToolList(paginateOptions?: PaginateOptions) {
    return this.toolModel.paginate(
      {},
      { ...paginateOptions, populate: this._toolPopulate },
    );
  }

  async getTool(toolId: string) {
    const tool = await this.toolModel
      .findById(toolId)
      .populate(this._toolPopulate);
    if (!tool) throw new NotFoundException(this._getNotFoundErrMsg(toolId));
    return tool;
  }

  private _getNotFoundErrMsg(id: string) {
    return `no tool found with id ${id}`;
  }
  //
}
