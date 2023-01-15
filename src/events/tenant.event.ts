import { OnEvent } from '@nestjs/event-emitter';
import { events } from 'src/common/constants/events.constants';
import { FirebaseService } from 'src/common/services/firebase.service';
import { Tenant } from 'src/tenant/models/tenant.model';

export class TenantEvent {
  @OnEvent(events.TENANT_DELETED)
  async deleteTenantFromFirebase(tenant: Tenant): Promise<void> {
    await FirebaseService.deleteUser(tenant.uuid);
  }
}
