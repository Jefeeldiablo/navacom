import express from 'express';
import { Log, Message } from '../configs';
import { TopicInterface } from '../interfaces';
import { Topic, Category, Comment, User } from '../models';

export class TopicController {

    constructor(app: express.Express) {

        app.get('/api/topic', (_, res) => {
            Topic.findAll({
                attributes: { exclude: [Topic.FK_CATEGORY] },
                include: [
                    { model: Category },
                    {
                        model: Comment,
                        attributes: {
                            exclude: [Comment.FK_USER, Comment.FK_TOPIC]
                        },
                        include: [User]
                    }
                ]
            })
                .then((data: TopicInterface[]) => res.json(data))
                .catch((error) => {
                    Log.get().error(Message.TOPIC_FIND_ERROR, error);
                    res.sendStatus(500);
                });
        });
    }
}