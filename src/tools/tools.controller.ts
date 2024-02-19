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
import { ModifyPaginationPipe } from 'src/common/pipes/modify-pagination.pipe';
import { ToolsService } from './tools.service';
import { GetToolsQueryDto } from './dto/get-tools-query.dto';
import { PaginateOptions } from 'mongoose';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ControllerReturnType } from 'src/common/common.interface';
import { MongooseExceptionFilter } from 'src/common/filters/mongoose-exception.filter';

@UseFilters(MongooseExceptionFilter)
@Controller('tools')
export class ToolsController {
  //

  private _moduleName = 'tool';

  constructor(private toolsService: ToolsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getToolList(
    @Query(ModifyPaginationPipe) query: GetToolsQueryDto,
  ): ControllerReturnType {
    const { docs, ...paginateInfo } = await this.toolsService.getToolList(
      query as unknown as PaginateOptions,
    );

    return {
      ok: true,
      data: docs,
      pagination: paginateInfo,
      statusCode: HttpStatus.OK,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTool(@Body() body: CreateToolDto): ControllerReturnType {
    const newTool = await this.toolsService.createTool(body);
    return {
      ok: true,
      data: newTool,
      statusCode: HttpStatus.CREATED,
      message: `new ${this._moduleName} was created successfully`,
      metadata: { reqBody: body },
    };
  }

  @Put('/:toolId')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateTool(
    @Param('toolId') toolId: string,
    @Body() body: UpdateToolDto,
  ): ControllerReturnType {
    const updatedTool = await this.toolsService.updateTool(toolId, body);

    return {
      ok: true,
      data: updatedTool,
      statusCode: HttpStatus.ACCEPTED,
      message: `${this._moduleName} with id ${updatedTool._id} updated successfully`,
      metadata: { reqBody: body },
    };
  }

  @Delete('/:toolId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTool(@Param('toolId') toolId: string): ControllerReturnType {
    await this.toolsService.deleteTool(toolId);
    return {
      ok: true,
      data: {},
      statusCode: HttpStatus.NO_CONTENT,
      message: `${this._moduleName} with id ${toolId} deleted successfully`,
    };
  }
}
