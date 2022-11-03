import { ModelClass, Transaction } from 'objection';
import { PostModel } from '../../models/post.model';
import CreatePostDto from '../../../posts/dtos/createPost.dto';
import SearchPostDto from '../../../posts/dtos/searchPost.dto';
import { PostStatus } from '../../../utils/types';
export declare class PostsDaoService {
    private postModel;
    static allGraphs: string;
    constructor(postModel: ModelClass<PostModel>);
    getUserPosts(userId: string): import("objection").QueryBuilder<PostModel, PostModel[]>;
    getById(postId: string, trx?: Transaction): import("objection").QueryBuilder<PostModel, PostModel>;
    create(post: CreatePostDto & {
        creatorId: string;
        status: PostStatus.OPEN;
    }): import("objection").QueryBuilder<PostModel, PostModel>;
    patchById(id: string, data: Partial<PostModel>): import("objection").QueryBuilder<PostModel, PostModel>;
    getUpcomingPosts(search: SearchPostDto): Promise<PostModel[]>;
    deleteAllUserPosts(userId: string, trx: Transaction): import("objection").QueryBuilder<PostModel, number>;
    getOpenPostsCount(): Promise<any>;
    getExpiredPostsCount(): Promise<any>;
    getClosedPostsCount(): Promise<any>;
    getExpiredOpenPosts(): import("objection").QueryBuilder<PostModel, PostModel[]>;
}
