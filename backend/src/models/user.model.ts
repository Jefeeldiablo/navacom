import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';
import { UserInterface } from '../interfaces';

@Table({
    tableName: 'USER', timestamps: false
})
export class User extends Model<UserInterface> {

    @PrimaryKey
    @Column({ type: DataType.BIGINT, autoIncrement: true, field: 'ID', allowNull: false })
    id: number;

    @Column({ type: DataType.TEXT, field: 'NAME', allowNull: false })
    name: string;

    @Column({ type: DataType.TEXT, field: 'LASTNAME', allowNull: false })
    lastname: string;

    @Column({ type: DataType.TEXT, field: 'EMAIL', allowNull: false })
    email: string;
}