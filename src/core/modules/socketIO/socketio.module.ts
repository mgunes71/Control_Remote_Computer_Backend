import { Module, OnModuleInit } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { SocketService } from "./services/socket.service";
import { KeyboardService } from "../../../shared/services/keyboard.service";
import { SharedModule } from "../../../shared/shared.module";
import { AuthenticationService } from "../../../applications/modules/authentication/services/authentication.service";
import { AuthenticationModule } from "../../../applications/modules/authentication/authentication.module";
import { UserEntity } from "../../../applications/models/user.entity";
import { ObsService } from "../../../applications/modules/obs/services/obs.service";

@Module({
  imports: [SharedModule, AuthenticationModule],
  providers: [SocketService, ObsService],
  exports: [SocketService]
})
export class SocketioModule implements OnModuleInit {
  constructor(private adapterHost: HttpAdapterHost,private socketService: SocketService, private keyboardService: KeyboardService, private authService: AuthenticationService,
                private obsService: ObsService
              ) {
  }

  async onModuleInit() {
    const httpAdapter = this.adapterHost.httpAdapter;
    const httpServer = httpAdapter.getHttpServer();

    this.socketService.createSocketServer(httpServer);

    this.socketService.onConnect().subscribe((socket) => {
      socket.on('authenticate', async (tokenData: string) => {
        if (!tokenData || !tokenData.includes("Bearer")) {
          socket.disconnect(true);
          console.log('discconnet')
          return;
        }

        const token = tokenData.replace("Bearer ", "");
        if (!token || token.toString().trim() === "") {
          socket.disconnect(true);
          return;
        }

        const [errDecode, decoded] = await this.authService.verifyToken(token).toArray();

        if (errDecode) {
          socket.disconnect(true);
          console.log('disconnect')
          return;
        }

        const [err, user] = await UserEntity.findByPk(decoded.id).toArray();
        if (err) {
          socket.disconnect(true);
          console.log('disconnect')
          return;
        }
      });

      socket.on("connectToObs", async (data: any) => {
        if (!this.obsService.onConnected) {
          socket.emit('obsConnectEvent', {
            status: 'Failed',
            message: 'Obs connection failed, Please make sure when opened obs websocket and connection port must be 4455'
          });
          // await this.obsService.InitializedObs();
        }
      });
    });
  }
}
