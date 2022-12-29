import { APIResponse } from "@playwright/test";
import Post from "../models/BlogPost";


export default class PostService {
    async getBlogPostsFromResponse(jsonResponse: APIResponse): Promise<Post[] | null> {
        let result: Post[] = JSON.parse(await jsonResponse.text());
        return result;
    }
}