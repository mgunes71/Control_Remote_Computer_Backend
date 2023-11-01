import { Controller, Get, Param } from "@nestjs/common";
import { ObsService } from "../services/obs.service";

@Controller('obs')
export class ObsController {
  constructor(private obsService: ObsService) {
  }

  @Get('current-scene')
  async getCurrentScene() {
    return this.obsService.getCurrentScene();
  }

  @Get('set-current-scene/:sceneName')
  async setCurrentScene(@Param('sceneName') sceneName: string) {
    return this.obsService.setCurrentScene(sceneName);
  }
}
