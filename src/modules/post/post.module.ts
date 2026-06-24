// Module bài viết đơn — route '/bai-viet/:slug'
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ContentService } from '../../shared/content.service';

@Module({
  controllers: [PostController],
  providers: [PostService, ContentService],
})
export class PostModule {}
