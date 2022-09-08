import { includes } from '../models/include.model';
import { Sequelize } from 'sequelize-typescript';

export class Db {

    private static instance: Db;
    private readonly config: Sequelize;

    private constructor() {
        this.config = new Sequelize({
            database: 'navacom',
            dialect: 'mysql',
            username: 'root',
            password: 'root',
            host: '192.168.1.120',
            port: 3306,
            models: includes,
            logging: false
        });
    }

    public static getInstance(): Db {
        if (!Db.instance) {
            Db.instance = new Db();
        }

        return Db.instance;
    }
}