import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Post } from "./post";

@Table({
  tableName: "comments",
  timestamps: true,
})
export class Comment extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare comment_id: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  post_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @BelongsTo(() => Post)
  post!: Post;
}