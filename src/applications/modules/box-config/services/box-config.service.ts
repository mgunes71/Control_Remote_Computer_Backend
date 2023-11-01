import { BadRequestException, Injectable } from "@nestjs/common";
import { BoxConfigEntity } from "../../../models/box-config.entity";
import { ActionType, BoxActionEntity } from "../../../models/box-action.entity";
import { KeyboardService } from "../../../../shared/services/keyboard.service";

@Injectable()
export class BoxConfigService {
  constructor(private keyboardService: KeyboardService) {
  }

  async getConfig(boxId: number) {
    const [err, config] = await BoxConfigEntity.findAll({
      where: {
        boxId: boxId,
      }
    }).toArray();

    if (err) {
      throw new BadRequestException('config not found');
    }

    return config;
  }

  async createConfig(configDto: any, actionId: number, boxId: number) {
    const [err, config] = await BoxConfigEntity.create({
      ...configDto,
      boxId,
      actionId
    }).toArray();

    if (err) {
      console.log(err)
      throw new BadRequestException('config not create');
    }

    return {
      status: 'success',
      message: 'config created successfully'
    }
  }

  async deleteConfig(boxId: number, configId: number) {
    const [err, config] = await BoxConfigEntity.findOne({
      where: {
        boxId: boxId,
        id: configId
      }
    }).toArray();

    if (err || !config) {
      throw new BadRequestException('config not found');
    }

    const [errDel, deleted] = await BoxConfigEntity.destroy({
      where: {
        id: config.id,
      }
    }).toArray();

    return {
      status: 'success',
      message: 'config deleted successfully'
    }
  }

  async updateConfig(boxId:number, configId: number, configDto: any) {

    const [err, config] = await BoxConfigEntity.findOne({
      where: {
        boxId: boxId,
        id: configId
      }
    }).toArray();

    if (err || !config) {
      throw new BadRequestException('config not found');
    }

    const [errUpdate, update] = await BoxConfigEntity.update({
      ...configDto
    }, {
      where: {
        boxId: boxId,
        id: configId
      }
    }).toArray();

    if (errUpdate) {
      throw new BadRequestException('Internal Server error');
    }

    return {
      status: 'success',
      message: 'update successfully'
    }
  }
}
