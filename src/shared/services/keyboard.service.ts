import { Injectable } from "@nestjs/common";
import * as os from "os";
import * as ks from "node-key-sender";
import { Key, keyboard , mouse, right, left, down, up} from "@nut-tree/nut-js";

@Injectable()
export class KeyboardService {
  keysType = Object.values(Key);
  constructor() {
  }

  async keyboardRun(keyData: any) {
    let keys = this.convertKeyAndFind(keyData);
    console.log(keys)
    for (const key of keys) {
      await keyboard.pressKey(Key[`${key}`]);
    }

    for (const key of keys) {
      await keyboard.releaseKey(Key[`${key}`]);
    }

    return true;
  }

  private convertKeyAndFind(keyData:any) {
    const keys = [];
    let keyArray = [];

    console.log()
    if (keyData.value.includes('+')) {
      keyArray = keyData.value.split('+');
      for (const key of keyArray) {
        const k = this.keysType.find((kt: any) => key.toLowerCase().trim() === kt.toString().toLowerCase());
        if (k !== undefined) {
          keys.push(`${k}`);
        }
      }
    } else {
      const k = this.keysType.find((kt: any) => keyData.value.toLowerCase().trim() === kt.toString().toLowerCase());
      if (k !== undefined) {
        keys.push(`${k}`);
      }
    }

    console.log(keys);
    return keys;
  }
}
