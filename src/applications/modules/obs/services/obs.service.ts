import { BadRequestException, Injectable } from "@nestjs/common";
import OBSWebSocket from "obs-websocket-js";
import { SocketService } from "../../../../core/modules/socketIO/services/socket.service";

@Injectable()
export class ObsService {
  private obs: OBSWebSocket;
  onConnected = false;

  constructor(private socketService: SocketService) {
  }

  getInstance(): OBSWebSocket {
    return this.obs;
  }

  async InitializedObs() {
    // if (this.obs) {
    //   return;
    // }
    this.obs = new OBSWebSocket();
    const [err, connect] = await this.obs.connect(process.env.WS_URL, process.env.OBS_PASS).toArray();


    if (err) {
      console.log(err);
      this.onConnected = false;
      return
      // throw new BadRequestException('obs connect failed');
    }
    this.onConnected = true;
    console.log('obs websocket connected');

    this.obs.on("CurrentProgramSceneChanged", data => {
      console.log(data)
      const newSceneName = data['sceneName'];
      this.socketService.send('current-scene', newSceneName);
    })
  }

  async getCurrentScene() {
    const [err, scene] = await this.obs.call('GetCurrentProgramScene').toArray();

    if (err) {
      throw new BadRequestException('Scene not found');
    }

    return scene;
  }

  async setCurrentScene(sceneName: string) {
    const [err, scene] = await this.obs.call('SetCurrentProgramScene', {sceneName: sceneName}).toArray();

    if (err) {
      console.log(err);
      throw new BadRequestException('Scene not found');
    }

    console.log(scene);
    return {
      status: 'success',
      message: 'scene set successfully'
    };
  }
}
