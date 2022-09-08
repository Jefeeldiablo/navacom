import { CategoryInterface } from '.';

export interface TopicInterface {
    id: number;
    date: number;
    title: string;
    description: string;
    url: string;
    headImage: string;
    iconImage?: string
    fkCategory?: number;
    category?: CategoryInterface;
}
