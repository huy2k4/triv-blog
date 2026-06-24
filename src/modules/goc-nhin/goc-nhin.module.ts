// Module chuyên mục Góc nhìn — route '/goc-nhin'
import { Module } from '@nestjs/common';
import { GocNhinController } from './goc-nhin.controller';
import { GocNhinService } from './goc-nhin.service';
import { ContentService } from '../../shared/content.service';

@Module({
  controllers: [GocNhinController],
  providers: [GocNhinService, ContentService],
})
export class GocNhinModule {}
