import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { BoxActionEntity } from "./box-action.entity";
import { BoxEntity } from "./box.entity";

@Table({
  tableName: 'box-config'
})

export class BoxConfigEntity extends Model<BoxConfigEntity>{
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  value: string;

  @Column(DataType.STRING)
  bg: string;

  @Column(DataType.STRING)
  type: string;

  @ForeignKey(() => BoxActionEntity)
  @Column(DataType.INTEGER)
  actionId: number;

  @BelongsTo(() => BoxActionEntity, {
    foreignKey: 'actionId',
    as: 'action',
    onDelete: 'CASCADE',
  })
  action: BoxActionEntity;

  @ForeignKey(() => BoxEntity)
  @Column(DataType.INTEGER)
  boxId: number;

  @BelongsTo(() => BoxEntity, {
    foreignKey: 'boxId',
    as: 'box',
    onDelete: 'CASCADE',
  })
  box: BoxEntity;
}
