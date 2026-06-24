// Dịch vụ tra cứu bài viết theo slug
import { Injectable } from '@nestjs/common';
import { ContentService } from '../../shared/content.service';

@Injectable()
export class PostService {
  constructor(private readonly content: ContentService) {}

  // Tìm bài viết theo slug; trả về undefined nếu không tồn tại
  getBySlug(slug: string) {
    return this.content.getPostBySlug(slug);
  }
}
