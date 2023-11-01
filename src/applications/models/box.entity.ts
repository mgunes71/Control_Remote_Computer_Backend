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
import { BoxActionEntity } from "./box-action.entity";

@Table({
  tableName: 'boxes'
})

export class BoxEntity extends Model<BoxEntity>{
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  text: string;

  @Column(DataType.STRING)
  background: string;

  @Column(DataType.STRING)
  color: string;

  @ForeignKey(() => PagesEntity)
  @Column(DataType.INTEGER)
  pageId: number;

  @BelongsTo(() => PagesEntity, {
    foreignKey: 'pageId',
    as: 'page',
    onDelete: 'CASCADE',
  })
  page: PagesEntity;

  @HasMany(() => BoxActionEntity, {foreignKey: 'boxId', as: 'actions'})
  actions: BoxActionEntity[];
}
