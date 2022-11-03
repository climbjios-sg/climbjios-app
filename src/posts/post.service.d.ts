import { HttpException } from '@nestjs/common';
import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { PostsDaoService } from '../database/daos/posts/posts.dao.service';
import PatchPostDto from './dtos/patchPost.dto';
import CreatePostDto from './dtos/createPost.dto';
import SearchPostDto from './dtos/searchPost.dto';
import { TelegramService } from '../utils/telegram/telegram.service';
import { PostModel } from '../database/models/post.model';
import { ConstantsService } from '../utils/constants/constants.service';
import { LoggerService } from '../utils/logger/logger.service';
export declare class PostService {
    private readonly postsDaoService;
    private readonly gymsDaoService;
    private readonly telegramService;
    private readonly constantsService;
    private readonly loggerService;
    constructor(postsDaoService: PostsDaoService, gymsDaoService: GymsDaoService, telegramService: TelegramService, constantsService: ConstantsService, loggerService: LoggerService);
    getOwnPosts(userId: string): import("objection").QueryBuilder<PostModel, PostModel[]>;
    createPost(creatorId: string, body: CreatePostDto): Promise<PostModel>;
    getPost(postId: string): Promise<PostModel>;
    patchPost(userId: string, postId: string, body: PatchPostDto): Promise<HttpException | PostModel>;
    searchPosts(query: SearchPostDto): Promise<PostModel[]>;
    updateExpiredOpenPosts(): Promise<(void | import("axios").AxiosResponse<any, any>)[]>;
    private checkPostTypeAndNumPasses;
    private notifyMainGroupOnSuccessfulPost;
    private editTelegramMessage;
    private formatAlertMessage;
    private formatAlertMessageInlineButton;
}
