import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey, HasMany,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { PagesEntity } from "./pages.entity";
import { BoxEntity } from "./box.entity";
import { BoxConfigEntity } from "./box-config.entity";

export enum ActionType {
  ONPRESS = 0,
  EVENT= 1,
  HOLDON = 2,
}

@Table({
  tableName: 'actions'
})

export class BoxActionEntity extends Model<BoxActionEntity>{
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(true)
  @Column(DataType.SMALLINT)
  type: ActionType;

  @ForeignKey(() => BoxEntity)
  @Column(DataType.INTEGER)
  boxId: number;

  @BelongsTo(() => BoxEntity, {
    foreignKey: 'boxId',
    as: 'box',
    onDelete: 'CASCADE',
  })
  box: BoxEntity;

  @HasMany(() => BoxConfigEntity, {foreignKey: 'actionId', as: 'config'})
  config: BoxConfigEntity[];
}
