import { Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { AuthenticatedUser } from "../../authentication/decorators/authenticated-user.decorator";
import { UserAuthGuard } from "../../authentication/guards/auth.guard";

@UseGuards(UserAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Patch(':pageId')
  async setDefaultPage(@AuthenticatedUser() user: any ,@Param('pageId') pageId: number) {
    return this.userService.updateDefaultPage(user, pageId);
  }
}
