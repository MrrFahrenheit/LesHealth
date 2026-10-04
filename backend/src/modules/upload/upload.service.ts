import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  private readonly bucketName = 'leshealth';

  constructor() {
    // El endpoint normalmente es la URL hasta .com (sin el bucket name al final)
    const endpoint = process.env.LESHEALTH_BUCKET_API?.replace(/\/leshealth\/?$/, '') || '';
    
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: endpoint,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || 'PENDIENTE',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'PENDIENTE',
      },
    });
  }

  async generatePresignedUrl(fileName: string, contentType: string, folder: string = 'general') {
    if (!process.env.R2_ACCESS_KEY_ID) {
      throw new InternalServerErrorException('Faltan las credenciales R2_ACCESS_KEY_ID y R2_SECRET_ACCESS_KEY en el .env');
    }

    const fileExtension = fileName.split('.').pop();
    const uniqueFileName = `${folder}/${uuidv4()}.${fileExtension}`;
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: uniqueFileName,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    
    // URL Pública para acceder a la imagen. Cloudflare R2 te da un dominio público (.r2.dev) o uno personalizado.
    const publicDomain = process.env.R2_PUBLIC_URL || 'AÑADIR_URL_PUBLICA_R2_EN_ENV';
    const fileUrl = `${publicDomain}/${uniqueFileName}`;

    return {
      uploadUrl,
      fileUrl,
    };
  }
}

