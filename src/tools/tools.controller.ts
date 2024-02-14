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
import { ModifyPaginationPipe } from 'src/common/pipes/modify-pagination.pipe';
import { ToolsService } from './tools.service';
import { GetToolsQueryDto } from './dto/get-tools-query.dto';
import { PaginateOptions } from 'mongoose';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Controller('tools')
export class ToolsController {
  //
  constructor(private toolsService: ToolsService) {}

  @Get()
  getToolList(@Query(ModifyPaginationPipe) query: GetToolsQueryDto) {
    return this.toolsService.getToolList(query as unknown as PaginateOptions);
  }

  @Post()
  async createTool(@Body() body: CreateToolDto) {
    const newTool = await this.toolsService.createTool(body);
    return { ok: true, tool: newTool };
  }

  @Put('/:toolId')
  async updateTool(
    @Param('toolId') toolId: string,
    @Body() body: UpdateToolDto,
  ) {
     
    const updatedTool = await this.toolsService.updateTool(toolId, body);
     
    return { ok: true, tool: updatedTool };
  }

  @Delete('/:toolId')
  async deleteTool(@Param('toolId') toolId: string) {
    await this.toolsService.deleteTool(toolId);
    return { ok: true };
  }
}
