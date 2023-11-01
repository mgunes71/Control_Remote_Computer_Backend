import {
  AllowNull,
  AutoIncrement, BelongsTo,
  Column,
  DataType, ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { BoxEntity } from "./box.entity";
import { UserEntity } from "./user.entity";

@Table({
  tableName: 'pages'
})

export class PagesEntity extends Model<PagesEntity>{
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @ForeignKey(() => UserEntity)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => UserEntity, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @HasMany(() => BoxEntity, {foreignKey: 'pageId', as: 'boxes'})
  boxes: BoxEntity[];
}
