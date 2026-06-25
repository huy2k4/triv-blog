// Dịch vụ gửi email tâm sự qua Gmail (nodemailer)
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TamSuService {
  // Khởi tạo transporter với tài khoản Gmail từ biến môi trường
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Gửi email tâm sự — hỗ trợ chế độ ẩn danh hoặc công khai
  async sendMessage(data: {
    name?: string;
    email?: string;
    message: string;
    isAnonymous: boolean;
  }) {
    const from = data.isAnonymous ? 'Người dùng ẩn danh' : data.name || 'Một người bạn';
    const subjectTitle = data.isAnonymous ? `[Tâm sự Ẩn danh] - Blog Triv` : `[Tâm sự từ ${from}] - Blog Triv`;
    const introText = data.isAnonymous 
      ? `Một người dùng ẩn danh muốn tâm sự với bạn rằng:`
      : `${from} muốn tâm sự với bạn rằng:`;

    const replyTo = data.email || undefined;

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo,
      subject: subjectTitle,
      html: `
        <h2>${introText}</h2>
        ${data.email ? `<p>Email người gửi: <a href="mailto:${data.email}">${data.email}</a></p>` : ''}
        <p>Chế độ: ${data.isAnonymous ? '🕶 Ẩn danh' : '👤 Công khai'}</p>
        <hr/>
        <p>${data.message.replace(/\n/g, '<br/>')}</p>
      `,
    });
  }
}
