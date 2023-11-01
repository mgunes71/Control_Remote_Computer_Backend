import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PageService } from "../services/page.service";
import { AuthenticatedUser } from "../../authentication/decorators/authenticated-user.decorator";
import { UserAuthGuard } from "../../authentication/guards/auth.guard";

@UseGuards(UserAuthGuard)
@Controller('pages')
export class PageController {
  constructor(private pageService: PageService) {
  }

  @Get()
  async getAllPages(@AuthenticatedUser() user: any) {
    return this.pageService.getAllPages(user);
  }

  @Get(':pageId')
  async getPageById(@AuthenticatedUser() user: any, @Param('pageId') pageId: number) {
    return this.pageService.getPageById(user, pageId);
  }

  @Post()
  async createPage(@AuthenticatedUser() user: any, @Body() pageDto: any) {
    return this.pageService.createPage(user, pageDto);
  }

  @Patch(':pageId')
  async updatePage(@AuthenticatedUser() user: any, @Param('pageId') pageId: number, @Body() pageDto: any) {
    return this.pageService.updatePage(user, pageId, pageDto);
  }

  @Delete(':pageId')
  async deletePage(@AuthenticatedUser() user: any, @Param('pageId') pageId: number) {
    return this.pageService.deletePage(user, pageId);
  }
}
