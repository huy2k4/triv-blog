// Module trang chủ — tập hợp controller và provider cho route gốc '/'
import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { ContentService } from '../../shared/content.service';

@Module({
  controllers: [HomeController],
  providers: [HomeService, ContentService],
})
export class HomeModule {}
