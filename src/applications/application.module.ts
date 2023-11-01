import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BoxModule } from "./modules/box/box.module";
import { ActionModule } from "./modules/action/action.module";
import { BoxConfigModule } from "./modules/box-config/box-config.module";
import { UserModule } from "./modules/user/user.module";
import { ObsModule } from "./modules/obs/obs.module";


@Module({
  imports: [AuthenticationModule, PagesModule, BoxModule, ActionModule, BoxConfigModule, UserModule, ObsModule],
  providers: [],
  exports: [],
})

export class ApplicationModule {

}
