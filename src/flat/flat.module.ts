import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessorEvent } from 'src/events/lessor.event';
import { FlatService } from './flat.service';
import { Flat } from './models/flat.model';

@Module({
  imports: [TypeOrmModule.forFeature([Flat])],
  providers: [FlatService, LessorEvent],
  exports: [FlatService],
})
export class FlatModule {}
