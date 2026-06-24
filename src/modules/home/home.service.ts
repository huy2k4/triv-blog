// Dịch vụ cung cấp dữ liệu cho trang chủ
import { Injectable } from '@nestjs/common';
import { ContentService } from '../../shared/content.service';

@Injectable()
export class HomeService {
  constructor(private readonly content: ContentService) {}

  // Trả về dữ liệu cho trang chủ: bài nổi bật và 6 bài gần nhất
  getHomeData() {
    return {
      featuredPost: this.content.getFeaturedPost(),
      recentPosts: this.content.getAllPosts().slice(0, 6),
    };
  }
}
