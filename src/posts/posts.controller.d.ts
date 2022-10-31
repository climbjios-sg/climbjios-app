import { HttpException } from '@nestjs/common';
import PatchPostDto from './dtos/patchPost.dto';
import CreatePostDto from './dtos/createPost.dto';
import { PostService } from './post.service';
import SearchPostDto from './dtos/searchPost.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getOwnPosts(req: any): import("objection").QueryBuilder<import("../database/models/post.model").PostModel, import("../database/models/post.model").PostModel[]>;
    createPost(req: any, body: CreatePostDto): Promise<import("../database/models/post.model").PostModel>;
    searchPosts(query: SearchPostDto): Promise<import("../database/models/post.model").PostModel[]>;
    getPost(params: any): Promise<import("../database/models/post.model").PostModel>;
    patchPost(req: any, params: any, body: PatchPostDto): Promise<HttpException | import("../database/models/post.model").PostModel>;
}
