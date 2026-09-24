import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(MailService.name);

  constructor() {
    this.init();
  }

  private async init() {
    // Para entornos de desarrollo usamos Ethereal Email (crea una cuenta de prueba gratis al vuelo)
    try {
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      this.logger.log('MailService inicializado con Ethereal. ¡Listo para pruebas!');
    } catch (err) {
      this.logger.error('Error inicializando MailService', err);
    }
  }

  async sendVerificationEmail(to: string, code: string) {
    if (!this.transporter) {
      this.logger.warn('Transporter no inicializado, intentando enviar mail de todas formas...');
      return;
    }

    const mailOptions = {
      from: '"LES Health" <noreply@leshealth.com>',
      to,
      subject: 'Código de verificación - LES Health',
      text: `Tu código de verificación es: ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #69409A;">Bienvenido a LES Health</h2>
          <p>Utiliza el siguiente código para verificar tu dirección de correo electrónico:</p>
          <div style="font-size: 24px; font-weight: bold; background-color: #f4f4f4; padding: 10px; width: fit-content; border-radius: 5px; letter-spacing: 2px;">
            ${code}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">Si no has solicitado este registro, ignora este correo.</p>
        </div>
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);

    // Ethereal proporciona una URL para previsualizar el correo (¡Genial para desarrollo local sin usar un email real!)
    this.logger.log(`Mensaje enviado: ${info.messageId}`);
    this.logger.log(`URL de previsualización (ABRIR PARA VER EL CÓDIGO): ${nodemailer.getTestMessageUrl(info)}`);
  }
}

