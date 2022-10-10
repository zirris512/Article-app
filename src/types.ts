export interface Article {
    id: number;
    title: string;
    description: string;
    link: string;
}

export interface Comment {
    id: number;
    comment: string;
    articleId: number;
}
