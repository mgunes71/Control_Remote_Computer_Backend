import {
  AllowNull,
  AutoIncrement, BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table
} from "sequelize-typescript";
import { PagesEntity } from "./pages.entity";

@Table({
  tableName: 'users',
})
@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Scopes(() => ({
  withPassword: {
    attributes: {
      include: ['password'],
    },
  },
}))
export class UserEntity extends Model<UserEntity> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column
  email: string;

  @Column
  password: string;

  @Default(0)
  @Column(DataType.SMALLINT)
  defaultPage: number;

  @HasMany(() => PagesEntity, {foreignKey: 'userId', as: 'pages'})
  pages: PagesEntity[];
}
