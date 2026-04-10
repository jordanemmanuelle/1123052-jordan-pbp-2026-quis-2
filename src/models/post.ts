import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
  AllowNull,
} from "sequelize-typescript";
import { Comment } from "./comment";
import { toDefaultValue } from "sequelize/types/utils";

@Table({
  tableName: "posts",
  timestamps: true,
})
export class Post extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare post_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  declare updatedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW
  })
  declare deletedAt: Date;
  


  @HasMany(() => Comment, 'post_id')
  comment!: Comment[];
}
