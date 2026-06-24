import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const viewsPath   = join(process.cwd(), 'views');
    const publicPath  = join(process.cwd(), 'public');

    app.setBaseViewsDir(viewsPath);
    app.setViewEngine('hbs');
    app.set('view options', { layout: 'layouts/main' });

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

    hbs.registerHelper('eq', (a: string, b: string) => a === b);
    hbs.registerHelper('year', () => new Date().getFullYear());

    app.useStaticAssets(publicPath);

    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

export default async function handler(req: any, res: any) {
  const server = await bootstrapServer();
  server(req, res);
}

if (!process.env.VERCEL) {
  bootstrapServer().then((server) => {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`🚀 Triv Blog đang chạy tại http://localhost:${port}`);
    });
  });
}
