import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from "../../../applications/models/user.entity";
import { PagesEntity } from "../../../applications/models/pages.entity";
import { BoxEntity } from "../../../applications/models/box.entity";
import { BoxActionEntity } from "../../../applications/models/box-action.entity";
import { BoxConfigEntity } from "../../../applications/models/box-config.entity";


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [UserEntity, PagesEntity, BoxEntity, BoxActionEntity, BoxConfigEntity],
      autoLoadModels: true,

      // define: {
      //   defaultScope: {
      //     nest: true,
      //     raw: true,
      //   },
      // },

      // sync: {
      //   alter: true,
      // },
    }),
  ],
  exports: [SequelizeModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
