// Module trang Tâm sự — route '/tam-su', hỗ trợ gửi email qua nodemailer
import { Module } from '@nestjs/common';
import { TamSuController } from './tam-su.controller';
import { TamSuService } from './tam-su.service';

@Module({
  controllers: [TamSuController],
  providers: [TamSuService],
})
export class TamSuModule {}
