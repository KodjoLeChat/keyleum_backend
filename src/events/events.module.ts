import { Module } from '@nestjs/common';
import { FlatModule } from 'src/flat/flat.module';
import { FlatImageModule } from 'src/flat_image/flat_image.module';

@Module({
  imports: [FlatModule, FlatImageModule],
})
export class EventsModule {}
