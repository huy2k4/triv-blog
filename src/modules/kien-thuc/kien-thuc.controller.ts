// Controller xử lý trang chuyên mục Kiến thức — render view 'category'
import { Controller, Get, Render } from '@nestjs/common';
import { KienThucService } from './kien-thuc.service';

@Controller('kien-thuc')
export class KienThucController {
  constructor(private svc: KienThucService) {}

  // Route GET /kien-thuc — hiển thị danh sách bài viết chuyên mục Kiến thức
  @Get()
  @Render('category')
  index() {
    return {
      title: 'Kiến thức — Triv.',
      description: 'Những điều đúc kết được qua học tập và trải nghiệm.',
      isKienThuc: true,
      categoryName: 'Kiến thức',
      categoryTagClass: 'tag-kienthuc',
      categoryDescription:
        'Chia sẻ kiến thức có hệ thống — từ lập trình đến kỹ năng sống.',
      posts: this.svc.getPosts(),
    };
  }
}
