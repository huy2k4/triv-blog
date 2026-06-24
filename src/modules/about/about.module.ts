// Module trang Giới thiệu — route '/gioi-thieu', không cần service
import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';

@Module({
  controllers: [AboutController],
})
export class AboutModule {}
