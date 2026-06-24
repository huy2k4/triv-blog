// Controller xử lý trang bài viết đơn — render view 'post' theo slug
import { Controller, Get, Param, Render, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('bai-viet')
export class PostController {
  constructor(private svc: PostService) {}

  // Route GET /bai-viet/:slug — hiển thị nội dung bài viết; ném 404 nếu không tìm thấy
  @Get(':slug')
  @Render('post')
  async show(@Param('slug') slug: string) {
    const post = this.svc.getBySlug(slug);
    if (!post) throw new NotFoundException('Bài viết không tồn tại');
    const { title: _t, ...rest } = post;
    return {
      title: `${post.title} — Triv.`,
      description: post.excerpt,
      ...rest,
    };
  }
}
