import { Module } from '@nestjs/common';
import { FlatModule } from 'src/flat/flat.module';

@Module({
  imports: [FlatModule],
})
export class EventsModule {}
