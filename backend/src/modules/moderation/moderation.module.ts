import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ModerationService } from './moderation.service';

@Global() // Hacemos global el módulo para poder usar ModerationService en cualquier lugar
@Module({
  imports: [HttpModule],
  providers: [ModerationService],
  exports: [ModerationService],
})
export class ModerationModule {}

