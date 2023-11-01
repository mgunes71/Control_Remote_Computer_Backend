import { Module } from "@nestjs/common";
import { SocketioModule } from "./modules/socketIO/socketio.module";
import { DatabaseModule } from "./modules/database/database.module";

@Module({
  imports: [DatabaseModule, SocketioModule],
  exports: []
})
export class CoreModule {}
