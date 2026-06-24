import { Module } from '@nestjs/common';
import { HomeModule } from './modules/home/home.module';
import { MyDaysModule } from './modules/my-days/my-days.module';
import { GocNhinModule } from './modules/goc-nhin/goc-nhin.module';
import { KienThucModule } from './modules/kien-thuc/kien-thuc.module';
import { TamSuModule } from './modules/tam-su/tam-su.module';
import { PostModule } from './modules/post/post.module';
import { AboutModule } from './modules/about/about.module';

@Module({
  imports: [
    HomeModule,
    MyDaysModule,
    GocNhinModule,
    KienThucModule,
    TamSuModule,
    PostModule,
    AboutModule,
  ],
})
export class AppModule {}
