export interface RedditChildrenData {
    created: number;
    title: string;
    description_html: string;
    url: string;
    header_img: string;
    icon_img: string;
    advertiser_category?: string;
}

export interface RedditChildren {
    data: RedditChildrenData;
}

export interface RedditData {
    children: RedditChildren[];
}

export interface Reddit {
    data: RedditData;
}
