import { Request } from "express";

export interface PostRequestBody extends Request {
    body: {
        title: string;
        description: string;
    };
}

interface UpdateRequestBody extends Request {
    body: {
        title?: string;
        description?: string;
    };
}

export interface RequestParams extends Request {
    params: {
        id: string;
    };
}

export interface UpdateRequest extends UpdateRequestBody {
    params: {
        id: string;
    };
}
