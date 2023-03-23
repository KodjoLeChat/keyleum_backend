import { Module } from '@nestjs/common';
import { TenantFlatService } from './tenant_flat.service';

@Module({
  providers: [TenantFlatService],
})
export class TenantFlatModule {}
