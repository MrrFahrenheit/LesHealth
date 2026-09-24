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
    try {
      // Si tenemos credenciales en las variables de entorno (Producción), usamos esas
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465', // true para 465, false para 587
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        this.logger.log('MailService inicializado para Producción (Usando variables de entorno)');
      } else {
        // Fallback: Entorno de desarrollo con Ethereal Email
        const testAccount = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, 
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        this.logger.log('MailService inicializado con Ethereal (Entorno de Desarrollo/Pruebas). ¡Módulo listo!');
      }
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
    this.logger.log(`Mensaje enviado: ${info.messageId}`);
    
    // Solo mostramos URL de previsualización si NO usamos credenciales reales
    if (!process.env.SMTP_USER) {
      this.logger.log(`URL de previsualización (ABRIR PARA VER EL CÓDIGO): ${nodemailer.getTestMessageUrl(info)}`);
    }
  }
}

