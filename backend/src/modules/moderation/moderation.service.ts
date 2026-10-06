import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ModerationService {
  private readonly logger = new Logger(ModerationService.name);
  private readonly apiUser = process.env.SIGHTENGINE_API_USER;
  private readonly apiSecret = process.env.SIGHTENGINE_API_SECRET;

  constructor(private readonly httpService: HttpService) {}

  /**
   * Verifica texto en busca de contenido ofensivo o profano.
   */
  async checkText(text: string): Promise<boolean> {
    if (!this.apiUser || !this.apiSecret) {
      this.logger.warn('Sightengine API credentials not configured, skipping text moderation');
      return true; // Asumimos que es válido si no hay API configurada para no bloquear la app
    }

    try {
      const url = `https://api.sightengine.com/1.0/text/check.json`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            text: text,
            lang: 'en,es', // Soporta español e inglés
            mode: 'rules',
            api_user: this.apiUser,
            api_secret: this.apiSecret,
          }
        })
      );

      const data = response.data;
      // Sightengine devuelve un array de 'profanity' con las palabras ofensivas encontradas
      if (data.profanity && data.profanity.matches && data.profanity.matches.length > 0) {
        return false; // Contiene contenido ofensivo
      }
      return true;
    } catch (error) {
      this.logger.error('Error during text moderation:', error);
      // En caso de error de API, podemos elegir lanzar un error o dejarlo pasar.
      // Lo dejamos pasar por ahora.
      return true;
    }
  }

  /**
   * Verifica imágenes en busca de desnudez o gore.
   * Asume que se provee una URL pública de la imagen.
   */
  async checkImageUrl(imageUrl: string): Promise<boolean> {
    if (!this.apiUser || !this.apiSecret) {
      this.logger.warn('Sightengine API credentials not configured, skipping image moderation');
      return true;
    }

    try {
      const url = `https://api.sightengine.com/1.0/check.json`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            url: imageUrl,
            models: 'nudity-2.0,gore',
            api_user: this.apiUser,
            api_secret: this.apiSecret,
          }
        })
      );

      const data = response.data;
      
      // Verificar desnudez (Con filtro mucho más estricto)
      if (data.nudity) {
        if (
          data.nudity.sexual_activity >= 0.1 || 
          data.nudity.sexual_display >= 0.1 || 
          data.nudity.erotica >= 0.1 ||
          data.nudity.suggestive >= 0.5 // Esto bloquea trajes de baño, lencería, poses sugerentes
        ) {
          return false;
        }
      }
      
      // Verificar gore
      if (data.gore && data.gore.prob >= 0.5) {
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error('Error during image moderation:', error);
      return true;
    }
  }

  /**
   * Lanza una excepción si el texto es ofensivo.
   */
  async validateTextOrThrow(text: string) {
    const isClean = await this.checkText(text);
    if (!isClean) {
      throw new BadRequestException('El contenido contiene lenguaje ofensivo o inapropiado.');
    }
  }

  /**
   * Lanza una excepción si la imagen contiene desnudez o gore.
   */
  async validateImageUrlOrThrow(imageUrl: string) {
    const isClean = await this.checkImageUrl(imageUrl);
    if (!isClean) {
      throw new BadRequestException('La imagen contiene contenido inapropiado (desnudez o violencia).');
    }
  }
}
