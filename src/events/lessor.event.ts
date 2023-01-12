import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { events } from 'src/common/constants/events.constants';

import { FlatService } from 'src/flat/flat.service';
import { Lessor } from 'src/lessor/models/lessor.model';

import { FirebaseService } from 'src/common/services/firebase.service';

@Injectable()
export class LessorEvent {
  constructor(
    @Inject(FlatService)
    private readonly flatService: FlatService,
  ) {}

  @OnEvent(events.LESSOR_DELETED)
  async deleteLessorFlats(lessor: Lessor) {
    const flats = lessor.flats;
    if (!flats) return;
    await Promise.all(
      flats.map(async (flat) => this.flatService.deleteFlat(flat.id)),
    );
  }

  @OnEvent(events.LESSOR_DELETED)
  async deleteLessorFromFirebase(lessor: Lessor) {
    await FirebaseService.deleteUser(lessor.uuid);
  }
}
