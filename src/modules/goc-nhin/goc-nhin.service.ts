// Dịch vụ cung cấp danh sách bài viết cho chuyên mục Góc nhìn
import { Injectable } from '@nestjs/common';
import { ContentService } from '../../shared/content.service';

@Injectable()
export class GocNhinService {
  constructor(private readonly content: ContentService) {}

  // Lấy tất cả bài viết thuộc chuyên mục 'goc-nhin'
  getPosts() {
    return this.content.getPostsByCategory('goc-nhin');
  }
}
