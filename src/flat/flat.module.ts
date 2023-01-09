import { Module } from '@nestjs/common';
import { FlatService } from './flat.service';

@Module({
  providers: [FlatService]
})
export class FlatModule {}
