// Controller xử lý trang chuyên mục My Days — render view 'category'
import { Controller, Get, Render } from '@nestjs/common';
import { MyDaysService } from './my-days.service';

@Controller('my-days')
export class MyDaysController {
  constructor(private svc: MyDaysService) {}

  // Route GET /my-days — hiển thị danh sách bài viết chuyên mục My Days
  @Get()
  @Render('my-days')
  index() {
    return {
      title: 'My Days — Triv.',
      description: 'Những sự kiện đặc biệt và khoảnh khắc đáng nhớ.',
      isMyDays: true,
      categoryName: 'My Days',
      categoryTagClass: 'tag-mydays',
      categoryDescription: 'Những sự kiện đặc biệt — viết khi có cảm hứng.',
      posts: this.svc.getPosts(),
    };
  }
}
