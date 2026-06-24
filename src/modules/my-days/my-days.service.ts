// Dịch vụ cung cấp danh sách bài viết cho chuyên mục My Days
import { Injectable } from '@nestjs/common';
import { ContentService } from '../../shared/content.service';

@Injectable()
export class MyDaysService {
  constructor(private readonly content: ContentService) {}

  // Lấy tất cả bài viết thuộc chuyên mục 'my-days'
  getPosts() {
    return this.content.getPostsByCategory('my-days');
  }
}
