import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo, BelongsToMany, HasMany } from 'sequelize-typescript';
import { TopicInterface } from '../interfaces';
import { Category, Comment } from '.';

@Table({
    tableName: 'TOPIC', timestamps: false
})
export class Topic extends Model<TopicInterface> {

    public static readonly FK_CATEGORY: string = 'fkCategory';

    @PrimaryKey
    @Column({ type: DataType.BIGINT, autoIncrement: true, field: 'ID', allowNull: false })
    id: number;

    @Column({ type: DataType.BIGINT, field: 'DATE', allowNull: false })
    date: number;

    @Column({ type: DataType.TEXT, field: 'TITLE', allowNull: false })
    title: string;

    @Column({ type: DataType.TEXT, field: 'DESCRIPTION', allowNull: false })
    description: string;

    @Column({ type: DataType.TEXT, field: 'URL', allowNull: false })
    url: string;

    @Column({ type: DataType.TEXT, field: 'HEAD_IMAGE', allowNull: true })
    headImage: string;

    @Column({ type: DataType.TEXT, field: 'ICON_IMAGE', allowNull: true })
    iconImage?: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.BIGINT, field: 'FK_CATEGORY', allowNull: true })
    fkCategory?: number;

    @BelongsTo(() => Category)
    category?: Category;

    @HasMany(() => Comment, 'fkTopic')
    comments: Comment[];
}
