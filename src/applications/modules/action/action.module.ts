import { Module } from '@nestjs/common';
import { ActionService } from "./services/action.service";
import { ActionController } from "./controllers/action.controller";
import { SharedModule } from "../../../shared/shared.module";
import { BoxConfigModule } from "../box-config/box-config.module";
import { ObsModule } from "../obs/obs.module";

@Module({
  imports: [SharedModule, BoxConfigModule, ObsModule],
  providers: [ActionService],
  controllers: [ActionController],
  exports: [ActionService]
})
export class ActionModule {}
