import { Module } from '@nestjs/common';
import { FlatImageService } from './flat_image.service';

@Module({
  providers: [FlatImageService]
})
export class FlatImageModule {}
