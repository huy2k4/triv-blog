import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Dùng process.cwd() để luôn trỏ đúng thư mục gốc project
  // bất kể chạy ở dev (src/) hay prod (dist/)
  const viewsPath   = join(process.cwd(), 'views');
  const publicPath  = join(process.cwd(), 'public');

  // Cấu hình Handlebars làm template engine
  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'layouts/main' });

  // Đăng ký partials thủ công đồng bộ
  const hbs = require('hbs');
  const fs = require('fs');
  const partialsDir = join(viewsPath, 'partials');
  if (fs.existsSync(partialsDir)) {
    const filenames = fs.readdirSync(partialsDir);
    filenames.forEach(function (filename) {
      if (filename.endsWith('.hbs')) {
        const matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) return;
        const name = matches[1];
        const template = fs.readFileSync(join(partialsDir, filename), 'utf8');
        hbs.registerPartial(name, template);
      }
    });
  }

  // Handlebars helpers
  hbs.registerHelper('eq', (a: string, b: string) => a === b);
  hbs.registerHelper('year', () => new Date().getFullYear());

  // Serve static files từ /public
  app.useStaticAssets(publicPath);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Triv Blog đang chạy tại http://localhost:${port}`);
}
bootstrap();
