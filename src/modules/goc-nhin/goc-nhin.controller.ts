// Controller xử lý trang chuyên mục Góc nhìn — render view 'category'
import { Controller, Get, Render } from '@nestjs/common';
import { GocNhinService } from './goc-nhin.service';

@Controller('goc-nhin')
export class GocNhinController {
  constructor(private svc: GocNhinService) {}

  // Route GET /goc-nhin — hiển thị danh sách bài viết chuyên mục Góc nhìn
  @Get()
  @Render('category')
  index() {
    return {
      title: 'Góc nhìn — Triv.',
      description: 'Chia sẻ quan điểm về những vấn đề đáng suy ngẫm.',
      isGocNhin: true,
      categoryName: 'Góc nhìn',
      categoryTagClass: 'tag-gocnhin',
      categoryDescription:
        'Quan điểm cá nhân về một vấn đề — không áp đặt, chỉ mở rộng tư duy.',
      posts: this.svc.getPosts(),
    };
  }
}
