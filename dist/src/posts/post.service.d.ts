import { HttpException } from '@nestjs/common';
import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { PostsDaoService } from '../database/daos/posts/posts.dao.service';
import PatchPostDto from './dtos/patchPost.dto';
import CreatePostDto from './dtos/createPost.dto';
import SearchPostDto from './dtos/searchPost.dto';
export declare class PostService {
    private readonly postsDaoService;
    private readonly gymsDaoService;
    constructor(postsDaoService: PostsDaoService, gymsDaoService: GymsDaoService);
    getOwnPosts(userId: string): import("objection").QueryBuilder<import("../database/models/post.model").PostModel, import("../database/models/post.model").PostModel[]>;
    createPost(creatorId: string, body: CreatePostDto): Promise<import("../database/models/post.model").PostModel>;
    getPost(userId: string, postId: string): Promise<import("../database/models/post.model").PostModel>;
    patchPost(userId: string, postId: string, body: PatchPostDto): Promise<import("../database/models/post.model").PostModel | HttpException>;
    searchPosts(query: SearchPostDto): Promise<import("../database/models/post.model").PostModel[]>;
    private checkPostTypeAndNumPasses;
}
