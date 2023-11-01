import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BoxService } from "../services/box.service";

@Controller('box')
export class BoxController {
  constructor(private boxService: BoxService) {
  }

  @Post(':pageId')
  async createBox(@Param('pageId') pageId: number, @Body() boxDto: any){
    return this.boxService.createBox(pageId,boxDto);
  }

  @Patch(':pageId/:boxId')
  async updateBox(@Param('pageId') pageId: number, @Param('boxId') boxId: number, @Body() boxDto: any) {
    return this.boxService.updateBox(pageId,boxId,boxDto);
  }

  @Get(':pageId')
  async getAllBoxes(@Param('pageId') pageId: number) {
    return this.boxService.getAllBox(pageId);
  }

  @Get(':pageId/:boxId')
  async getBoxById(@Param('pageId') pageId: number, @Param('boxId') boxId: number) {
    return this.boxService.getBoxById(pageId, boxId);
  }

  @Delete(':pageId/:boxId')
  async deleteBox(@Param('pageId') pageId: number, @Param('boxId') boxId: number) {
    return this.boxService.deleteBox(pageId, boxId);
  }
}
