import { Module } from '@nestjs/common';
import { BoxConfigController } from "./controllers/box-config.controller";
import { BoxConfigService } from "./services/box-config.service";
import { SharedModule } from "../../../shared/shared.module";

@Module({
  imports: [SharedModule],
  controllers: [BoxConfigController],
  providers: [BoxConfigService],
  exports: [BoxConfigService],
})
export class BoxConfigModule {}
