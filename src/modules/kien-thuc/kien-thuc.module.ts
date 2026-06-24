// Module chuyên mục Kiến thức — route '/kien-thuc'
import { Module } from '@nestjs/common';
import { KienThucController } from './kien-thuc.controller';
import { KienThucService } from './kien-thuc.service';
import { ContentService } from '../../shared/content.service';

@Module({
  controllers: [KienThucController],
  providers: [KienThucService, ContentService],
})
export class KienThucModule {}
