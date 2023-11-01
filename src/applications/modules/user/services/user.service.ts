import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "../../../models/user.entity";
import { PagesEntity } from "../../../models/pages.entity";

@Injectable()
export class UserService {
  constructor() {
  }

  async updateDefaultPage(user: any, pageId: number) {
    const [errPage, page] = await PagesEntity.findOne({
      where: {
        userId: user.id,
        id: pageId
      }
    }).toArray();

    if (errPage || !page) {
      throw new BadRequestException('page not found');
    }

    const [err, userPage] = await UserEntity.update(
      {
      defaultPage: pageId
    }, {
      where: {
        id: user.id
      }
    }).toArray();

    if (err) {
      throw new BadRequestException('Internal Server error');
    }

    return {
      status: 'success',
      message: 'page set default successfully'
    }
  }
}
