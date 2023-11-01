import { BadRequestException, Injectable } from "@nestjs/common";
import { PagesEntity } from "../../../models/pages.entity";

@Injectable()
export class PageService {
  constructor() {
  }

  async getAllPages(user: any) {
    const [err, pages] = await PagesEntity.findAll({
      where: {
        userId: user.id
      }
    }).toArray();

    if (err) {
      throw new BadRequestException('Internal Server Error');
    }
    return pages;
  }

  async getPageById(user: any, pageId: number) {
    const [err, page] = await PagesEntity.findOne({
      where: {
        userId: user.id,
        id: pageId,
      }
    }).toArray();

    if (err || !page) {
      throw new BadRequestException('Page not found');
    }
    return page;
  }

  async createPage(user: any, pageDto: any) {
    const [err, page] = await PagesEntity.findOne({
      where: {
        userId: user.id,
        name: pageDto.name,
      }
    }).toArray();

    if (err) {
      console.log(err)
      throw new BadRequestException('Internal Server Error');
    }

    if (page) {
      throw new BadRequestException('Page already exist');
    }

    const [errCreate, createdPage] = await PagesEntity.create(
      {
        ...pageDto,
        userId: user.id,
      }
    ).toArray();

    if (errCreate) {
      console.log(errCreate)
      throw new BadRequestException('Internal Server Error');
    }

    return {
      status: 'success',
      message: 'page created successfully'
    }
  }

  async updatePage(user: any, pageId: number, pageDto: any) {
    const [err, page] = await PagesEntity.findOne({
      where: {
        userId: user.id,
        id: pageId
      }
    }).toArray();

    if (err || !page) {
      throw new BadRequestException('Page not found');
    }

    const [errUpd, updatedPage] = await PagesEntity.update({
      ...pageDto,
    }, {
      where: {
        id: page.id,
      }
    }).toArray();

    if (errUpd) {
      throw new BadRequestException('Internal Server Error');
    }

    return {
      status: 'success',
      message: 'page updated successfully'
    }
  }

  async deletePage(user: any, pageId: number) {
    const [err, page] = await PagesEntity.findOne({
      where: {
        userId: user.id,
        id: pageId
      }
    }).toArray();

    if (err || !page) {
      throw new BadRequestException('Page not found');
    }

    const [errDel, deletedPage] = await PagesEntity.destroy( {
      where: {
        id: page.id,
      }
    }).toArray();

    if (errDel) {
      throw new BadRequestException('Internal Server Error');
    }

    return {
      status: 'success',
      message: 'page deleted successfully'
    }
  }
}
