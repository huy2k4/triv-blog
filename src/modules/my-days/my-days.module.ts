// Module chuyên mục My Days — route '/my-days'
import { Module } from '@nestjs/common';
import { MyDaysController } from './my-days.controller';
import { MyDaysService } from './my-days.service';
import { ContentService } from '../../shared/content.service';

@Module({
  controllers: [MyDaysController],
  providers: [MyDaysService, ContentService],
})
export class MyDaysModule {}
