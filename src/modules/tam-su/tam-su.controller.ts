// Controller xử lý trang Tâm sự — hiển thị form và nhận tin nhắn
import { Controller, Get, Post, Body, Render, Redirect } from '@nestjs/common';
import { TamSuService } from './tam-su.service';

@Controller('tam-su')
export class TamSuController {
  constructor(private svc: TamSuService) {}

  // Route GET /tam-su — hiển thị form gửi tâm sự
  @Get()
  @Render('tam-su')
  index() {
    return {
      title: 'Tâm sự với tôi — Triv.',
      description: 'Gửi cho Triv một lời tâm sự — ẩn danh hay công khai tùy bạn.',
      isTamSu: true,
    };
  }

  // Route POST /tam-su/gui — nhận dữ liệu form, gửi email và redirect về trang xác nhận
  @Post('gui')
  @Redirect()
  async submit(@Body() body: any) {
    const isAnonymous = body.mode !== 'public';
    try {
      await this.svc.sendMessage({
        name: body.name,
        email: body.email,
        message: body.message,
        isAnonymous,
      });
    } catch (e) {
      console.error('Email error:', e);
    }
    // Chuyển hướng về trang tâm sự với tham số báo thành công
    return { url: '/tam-su?success=1', statusCode: 303 };
  }
}
