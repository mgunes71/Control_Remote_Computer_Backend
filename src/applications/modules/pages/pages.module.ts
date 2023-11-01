import { Module } from '@nestjs/common';
import { PageController } from "./controllers/page.controller";
import { PageService } from "./services/page.service";

@Module({
  imports: [],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService]
})
export class PagesModule {}
