import { Controller, Get, Param } from "@nestjs/common";
import { ActionService } from "../services/action.service";

@Controller('action')
export class ActionController {
  constructor(private actionService: ActionService) {
  }

  @Get('run/:boxId/')
  async runAction(@Param('boxId') boxId: number) {
    return this.actionService.runAction(boxId);
  }
}
