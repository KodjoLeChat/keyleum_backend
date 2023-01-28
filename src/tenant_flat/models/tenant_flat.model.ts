import { Flat } from 'src/flat/models/flat.model';
import { Tenant } from 'src/tenant/models/tenant.model';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('student_course')
export class StudentCourse {
  @PrimaryColumn({ name: 'tenant_id' })
  tenantId: number;

  @PrimaryColumn({ name: 'flat_id' })
  flatId: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.flats, {})
  @JoinColumn([{ name: 'tenant_id', referencedColumnName: 'id' }])
  tenants: Tenant[];

  @ManyToOne(() => Flat, (flat) => flat.tenants, {})
  @JoinColumn([{ name: 'flat_id', referencedColumnName: 'id' }])
  flats: Flat[];
}
