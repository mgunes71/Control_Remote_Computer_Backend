import { BadRequestException, Get, Injectable, Param } from "@nestjs/common";
import { BoxConfigService } from "../../box-config/services/box-config.service";
import { KeyboardService } from "../../../../shared/services/keyboard.service";
import { BoxActionEntity } from "../../../models/box-action.entity";
import { ObsService } from "../../obs/services/obs.service";


@Injectable()
export class ActionService {
  constructor(private boxConfigService: BoxConfigService, private keyboardService: KeyboardService, private obsService: ObsService) {
  }

  async runAction(boxId: number) {
    const [errAc, action] = await BoxActionEntity.findAll().toArray();
    if (errAc || action.length === 0) {
      throw new BadRequestException('action not found');
    }

    const [err,configs] = await this.boxConfigService.getConfig(boxId).toArray();

    for (const config of configs) {
      if (config.type === '0') {
        const key = {value: config.value}
        await this.keyPressAction(key);
      }

      if (config.type === '1') {
        const key = {value: config.value}
        await this.obsSetCurrentScreen(key.value);
      }
    }

    return {
      status: 'success',
      message: 'command run successfully'
    }
  }

  async keyPressAction(key: any) {
    const [err, keyboard] = await this.keyboardService.keyboardRun(key).toArray();
    if (err) {
      console.log(err);
      throw new BadRequestException('Unknown Error');
    }
  }

  async obsSetCurrentScreen(sceneName: string) {
    return  this.obsService.setCurrentScene(sceneName);
  }
  async obsGetCurrentScreen() {}
  async obsSwitchScene() {}

}
