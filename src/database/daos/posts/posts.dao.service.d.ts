import { ModelClass, Transaction } from 'objection';
import { PostModel } from '../../models/post.model';
import CreatePostDto from '../../../posts/dtos/createPost.dto';
import SearchPostDto from '../../../posts/dtos/searchPost.dto';
export declare class PostsDaoService {
    private postModel;
    static allGraphs: string;
    constructor(postModel: ModelClass<PostModel>);
    getUserPosts(userId: string): import("objection").QueryBuilder<PostModel, PostModel[]>;
    getById(postId: string, trx?: Transaction): import("objection").QueryBuilder<PostModel, PostModel>;
    create(post: CreatePostDto & {
        creatorId: string;
        isClosed: boolean;
    }): import("objection").QueryBuilder<PostModel, PostModel>;
    patchById(id: string, data: Partial<PostModel>): import("objection").QueryBuilder<PostModel, PostModel>;
    getUpcomingPosts(search: SearchPostDto): Promise<PostModel[]>;
    deleteAllUserPosts(userId: string, trx: Transaction): import("objection").QueryBuilder<PostModel, number>;
    getPostsCount(): Promise<any>;
    getOpenPostsCount(): Promise<any>;
    closePostsWithEndDateBefore(date: Date): import("objection").QueryBuilder<PostModel, number>;
}
