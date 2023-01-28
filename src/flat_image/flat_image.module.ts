import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatImageService } from './flat_image.service';
import { FlatImages } from './models/flat_image.model';

@Module({
  imports: [TypeOrmModule.forFeature([FlatImages])],
  providers: [FlatImageService],
  exports: [FlatImageService],
})
export class FlatImageModule {}
