import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;
  private logger = new Logger(MailService.name);
  private isResendConfigured = false;

  constructor() {
    this.init();
  }

  private init() {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.isResendConfigured = true;
      this.logger.log('MailService inicializado con Resend (RESEND_API_KEY encontrada)');
    } else {
      this.logger.warn('RESEND_API_KEY no encontrada en las variables de entorno. Los correos se simularán en consola.');
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

    if (!this.isResendConfigured) {
      this.logger.log(`\n================ SIMULACIÓN DE CORREO ================`);
      this.logger.log(`Para: ${to}`);
      this.logger.log(`Asunto: ${subject}`);
      this.logger.log(`Código secreto: ${code}`);
      this.logger.log(`Nota: Añade RESEND_API_KEY al archivo .env para enviar correos reales.`);
      this.logger.log(`======================================================\n`);
      return;
    }

    try {
      const { data, error } = await this.resend.emails.send({
        // IMPORTANTE: resend.dev solo permite enviar correos a la dirección registrada en la cuenta de Resend (la tuya).
        // Para enviar a cualquier persona, debes verificar un dominio en tu cuenta de Resend.
        from: 'LES Health <onboarding@resend.dev>', 
        to: [to],
        subject: subject,
        html: htmlContent,
      });

      if (error) {
        this.logger.error(`Error enviando correo vía Resend: ${JSON.stringify(error)}`);
      } else {
        this.logger.log(`Mensaje enviado exitosamente. ID: ${data?.id}`);
      }
    } catch (err) {
      this.logger.error('Excepción al enviar correo', err);
    }
  }
}
