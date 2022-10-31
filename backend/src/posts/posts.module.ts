import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostService } from './post.service';
import { TelegramModule } from '../utils/telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
