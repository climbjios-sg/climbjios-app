import { Global, Module } from '@nestjs/common';
import { PostsDaoService } from './posts.dao.service';

@Global()
@Module({
  providers: [PostsDaoService],
  exports: [PostsDaoService],
})
export class PostDaoModule {}
