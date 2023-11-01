import { BadRequestException, Injectable } from "@nestjs/common";
import { BoxEntity } from "../../../models/box.entity";

@Injectable()
export class BoxService {
  constructor() {
  }

  async createBox(pageId: number, boxDto: any) {
    const [err, boxControl] = await BoxEntity.findOne({
      where: {
        pageId: pageId,
        text: boxDto.text
      }
    }).toArray();

    if (err) {
      throw new BadRequestException('Server Internal Error');
    }

    if (boxControl) {
      throw new BadRequestException('button name already exist');
    }

    const [errCreate, created] = await BoxEntity.create({
      ...boxDto,
      pageId: pageId,
    }).toArray();

    if (errCreate) {
      throw new BadRequestException('Internal Server Error');
    }

    return {
      status: 'success',
      message: 'Button created successfully'
    }
  }

  async updateBox(pageId: number, boxId: number, boxDto: any) {
    const [err, box] = await BoxEntity.findOne({
      where: {
        pageId: pageId,
        id: boxId
      }
    }).toArray();

    if (err || !box) {
      throw new BadRequestException('Button not found');
    }

    const [errUp, updated] = await BoxEntity.update({
      ...boxDto,
    }, {
      where: {
        pageId: pageId,
        id: boxId
      }
    }).toArray();

    if (errUp) {
      throw new BadRequestException('Internal server error');
    }

    return {
      status: 'success',
      message: 'box updated successfully'
    }
  }

  async getAllBox(pageId: number) {
    const [err, boxes] = await BoxEntity.findAll({
      where: {
        pageId: pageId,
      }
    }).toArray();

    if (err) {
      throw new BadRequestException('Internal Server Error');
    }

    return boxes;
  }

  async getBoxById(pageId: number, boxId: number) {
    const [err, box] = await BoxEntity.findOne({
      where: {
        pageId: pageId,
        id: boxId
      }
    }).toArray();

    if (err || !box) {
      throw new BadRequestException('Button not found');
    }

    return box;
  }

  async deleteBox(pageId: number, boxId: number) {
    const [err, box] = await BoxEntity.findOne({
      where: {
        pageId: pageId,
        id: boxId
      }
    }).toArray();

    if (err || !box) {
      throw new BadRequestException('Button not found');
    }

    const [errDel, deleted] = await BoxEntity.destroy({
      where: {
        pageId: pageId,
        id: boxId
      }
    }).toArray();

    if (errDel) {
      throw new BadRequestException('Button not found');
    }

    return {
      status: 'success',
      message: 'box deleted successfully'
    };
  }
}
