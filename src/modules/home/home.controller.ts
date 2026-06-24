// Controller xử lý trang chủ — render view 'home'
import { Controller, Get, Render } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // Route GET / — hiển thị trang chủ với bài nổi bật và bài gần nhất
  @Get()
  @Render('home')
  index() {
    const { featuredPost, recentPosts } = this.homeService.getHomeData();
    return {
      title: 'Triv. — My Days · Góc nhìn · Kiến thức · Tâm sự',
      description:
        'Blog cá nhân của Trivelet Aisling (Triv) — những ngày tháng, góc nhìn và điều đúc kết.',
      isHome: true,
      featuredPost,
      recentPosts,
    };
  }
}
