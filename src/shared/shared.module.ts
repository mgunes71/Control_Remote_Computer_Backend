import { Module } from "@nestjs/common";
import { KeyboardService } from "./services/keyboard.service";

@Module({
  imports: [],
  providers: [KeyboardService],
  exports: [KeyboardService]
})
export class SharedModule {

}
