// Dịch vụ cung cấp danh sách bài viết cho chuyên mục Kiến thức
import { Injectable } from '@nestjs/common';
import { ContentService } from '../../shared/content.service';

@Injectable()
export class KienThucService {
  constructor(private readonly content: ContentService) {}

  // Lấy tất cả bài viết thuộc chuyên mục 'kien-thuc'
  getPosts() {
    return this.content.getPostsByCategory('kien-thuc');
  }
}
