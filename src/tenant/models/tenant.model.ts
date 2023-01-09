import { ObjectType } from '@nestjs/graphql';
import { Person } from 'src/person/models/person.model';
import { Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Tenant extends Person {}
