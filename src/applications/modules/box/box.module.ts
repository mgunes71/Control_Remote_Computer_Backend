import { Module } from '@nestjs/common';
import { BoxController } from "./controllers/box.controller";
import { BoxService } from "./services/box.service";

@Module({
  imports: [],
  controllers: [BoxController],
  providers: [BoxService],
  exports: [BoxService],
})
export class BoxModule {}
