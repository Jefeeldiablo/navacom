import express from 'express';
import cors from 'cors';

export class Api {

    private static instance: Api;
    private readonly app: express.Express;

    private constructor() {
        this.app = express();
        this.app.use(cors({
            origin: (_, callback) => {
                callback(null, '*');
            },
            methods: 'GET',
            preflightContinue: false,
            optionsSuccessStatus: 204
        }));
        this.app.use(express.json({ limit: '1mb' }));
    }

    getApp(): express.Express {
        return this.app;
    }

    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api();
        }

        return Api.instance;
    }
}