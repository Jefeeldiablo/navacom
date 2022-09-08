import axios, { AxiosResponse } from 'axios';
import { Category, Topic } from '../models';
import { Reddit, CategoryInterface, TopicInterface, RedditChildren, RedditChildrenData } from '../interfaces';
import { forkJoin, from, map, mergeMap, Observable, of } from 'rxjs';


export class DataDefault {

    private static instance: DataDefault;

    private constructor() { }

    public insertDataDefault(): Observable<boolean> {
        return from(Category.findAll({ raw: true }))
            .pipe(
                mergeMap((data: CategoryInterface[]) =>
                    (data.length === 0)
                        ? from(this.saveData())
                        : of(true)
                )
            );
    }

    private saveData(): Observable<boolean> {
        return from(axios.get<Reddit>('https://www.reddit.com/reddits.json'))
            .pipe(
                map((response: AxiosResponse<Reddit, any>) => response.data.data.children),
                map((children: RedditChildren[]) => [this.getCategoriesSave(children), children]),
                mergeMap(([categories, children]: [Observable<CategoryInterface>[], RedditChildren[]]) =>
                    forkJoin(categories)
                        .pipe(
                            map((data: CategoryInterface[]) => this.getTopicsSave(data, children)),
                            mergeMap((topics: Observable<TopicInterface>[]) => forkJoin(topics))
                        )
                ),
                map(() => true)
            );
    }

    private getTopicsSave(categories: CategoryInterface[], children: RedditChildren[]): Observable<TopicInterface>[] {
        return children
            .map((child: RedditChildren) => child.data)
            .map((data: RedditChildrenData) => {
                const nameCategory = (data?.advertiser_category) ? data.advertiser_category : undefined;
                const fkCategory = categories.find((value: CategoryInterface) =>
                    value.name === nameCategory
                )?.id;
                return this.saveTopic(data, fkCategory);
            });
    }

    private saveTopic(data: RedditChildrenData, fkCategory?: number): Observable<Topic> {
        return from(
            Topic.create({
                date: data.created,
                title: data.title,
                description: this.cleanDescription(data.description_html),
                url: data.url,
                headImage: (data.header_img || undefined),
                iconImage: (data.icon_img || undefined),
                fkCategory: fkCategory
            })
        );
    }

    private cleanDescription(description: string): string {
        return description.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }

    private getCategoriesSave(children: RedditChildren[]): Observable<CategoryInterface>[] {
        const categories = children.map((sub: RedditChildren) =>
            sub.data.advertiser_category || undefined
        ).filter((value) => value !== undefined);

        return [...new Set(categories)].map((name: string) =>
            from(Category.create({ name }))
        );
    }

    public static getInstance(): DataDefault {
        if (!DataDefault.instance) {
            DataDefault.instance = new DataDefault();
        }

        return DataDefault.instance;
    }
}
