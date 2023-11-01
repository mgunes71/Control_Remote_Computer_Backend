import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BoxConfigService } from "../services/box-config.service";

@Controller('box-config')
export class BoxConfigController {
  constructor(private boxConfigService: BoxConfigService) {
  }

  @Get(':boxId')
  async getConfig(@Param('boxId') boxId: number) {
    return this.boxConfigService.getConfig(boxId);
  }

  @Post(':actionId/:boxId')
  async createConfig(@Param('actionId') actionId: number, @Param('boxId') boxId: number, @Body() configDto: any) {
    return this.boxConfigService.createConfig(configDto, actionId, boxId);
  }

  @Delete(':boxId/:id')
  async deleteConfig(@Param('boxId') boxId: number, @Param('id') id: number) {
    return this.boxConfigService.deleteConfig(boxId, id);
  }

  @Patch(':boxId/:id')
  async updateConfig(@Param('boxId') boxId: number, @Param('id') id: number, @Body() configDto: any) {
    return this.boxConfigService.updateConfig(boxId, id, configDto);
  }
}
