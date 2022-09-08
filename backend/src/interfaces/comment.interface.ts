import { UserInterface, TopicInterface } from '.';

export interface CommentInterface {
    id: number;
    date: number;
    text: string;
    fkUser: number;
    user: UserInterface;
    fkTopic: number;
    topic: TopicInterface;
}   
