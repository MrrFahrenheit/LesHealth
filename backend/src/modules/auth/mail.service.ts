import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(MailService.name);

  constructor() {
    this.init();
  }

  private init() {
    // Usaremos Gmail que permite enviar a cualquier persona gratis (con un App Password)
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user,
          pass: pass,
        },
      });
      this.logger.log('MailService inicializado con Gmail SMTP');
    } else {
      this.logger.warn('SMTP_USER o SMTP_PASS no encontrados. Los correos se simularán en consola.');
    }
  }

  async sendVerificationEmail(to: string, code: string) {
    const subject = 'Código de verificación - LES Health';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #69409A;">Bienvenido a LES Health</h2>
        <p>Utiliza el siguiente código para verificar tu dirección de correo electrónico:</p>
        <div style="font-size: 24px; font-weight: bold; background-color: #f4f4f4; padding: 10px; width: fit-content; border-radius: 5px; letter-spacing: 2px;">
          ${code}
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #777;">Si no has solicitado este registro, ignora este correo.</p>
      </div>
    `;

    if (!this.transporter) {
      this.logger.log(`\n================ SIMULACIÓN DE CORREO ================`);
      this.logger.log(`Para: ${to}`);
      this.logger.log(`Asunto: ${subject}`);
      this.logger.log(`Código secreto: ${code}`);
      this.logger.log(`Nota: Añade SMTP_USER (tu correo Gmail) y SMTP_PASS (tu contraseña de aplicación) al .env para enviar correos reales`);
      this.logger.log(`======================================================\n`);
      return;
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"LES Health" <${process.env.SMTP_USER}>`,
        to: to,
        subject: subject,
        html: htmlContent,
      });

      this.logger.log(`Mensaje enviado exitosamente. ID: ${info.messageId}`);
    } catch (err) {
      this.logger.error('Excepción al enviar correo', err);
    }
  }
}
