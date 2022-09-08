import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';
import { CategoryInterface } from '../interfaces';

@Table({
    tableName: 'CATEGORY',
    timestamps: false
})
export class Category extends Model<CategoryInterface> {

    @PrimaryKey
    @Column({ type: DataType.BIGINT, autoIncrement: true, field: 'ID', allowNull: false })
    id: number;

    @Column({ type: DataType.TEXT, field: 'NAME', allowNull: false })
    name: string;
}
