import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';
import { SesionGuard } from 'src/common/guards/sesion.guard';

@Controller('upload')
@UseGuards(SesionGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('presigned-url')
  async getPresignedUrl(@Body() body: { fileName: string; contentType: string; folder?: string }) {
    return this.uploadService.generatePresignedUrl(body.fileName, body.contentType, body.folder);
  }
}

