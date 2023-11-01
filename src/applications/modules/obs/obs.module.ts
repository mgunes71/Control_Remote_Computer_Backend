import { Module, OnModuleInit } from "@nestjs/common";
import { ObsController } from "./controllers/obs.controller";
import { ObsService } from "./services/obs.service";
import { SocketioModule } from "../../../core/modules/socketIO/socketio.module";

@Module({
  imports: [SocketioModule],
  controllers: [ObsController],
  providers: [ObsService],
  exports: [ObsService]
})
export class ObsModule implements OnModuleInit{
  constructor(private obsService: ObsService) {
  }
  async onModuleInit(): Promise<any> {
    await this.obsService.InitializedObs();
  }
}
