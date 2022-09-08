import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CommentInterface } from '../interfaces';
import { User, Topic } from '.';

@Table({
    tableName: 'COMMENT', timestamps: false
})
export class Comment extends Model<CommentInterface> {

    public static readonly FK_USER: string = 'fkUser';
    public static readonly FK_TOPIC: string = 'fkTopic';

    @PrimaryKey
    @Column({ type: DataType.BIGINT, autoIncrement: true, field: 'ID', allowNull: false })
    id: number;

    @Column({ type: DataType.BIGINT, field: 'DATE', allowNull: false })
    date: number;

    @Column({ type: DataType.BIGINT, field: 'TEXT', allowNull: false })
    text: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, field: 'FK_USER', allowNull: false })
    fkUser: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Topic)
    @Column({ type: DataType.BIGINT, field: 'FK_TOPIC', allowNull: false })
    fkTopic: number;

    @BelongsTo(() => Topic)
    topic: Topic;
}
