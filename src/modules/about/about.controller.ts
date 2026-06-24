// Controller xử lý trang Giới thiệu — render view 'about'
import { Controller, Get, Render } from '@nestjs/common';

@Controller('gioi-thieu')
export class AboutController {
  // Route GET /gioi-thieu — hiển thị trang giới thiệu tác giả
  @Get()
  @Render('about')
  index() {
    return {
      title: 'Giới thiệu — Triv.',
      description:
        'Võ Quốc Huy — Trivelet Aisling (Triv). Người viết, người học, người sống.',
    };
  }
}
