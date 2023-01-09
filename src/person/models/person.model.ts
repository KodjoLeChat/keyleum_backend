import { Field, InterfaceType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models/node.model';
import { Column } from 'typeorm';

@InterfaceType()
export abstract class Person extends Node {
  @Field(() => String)
  @Column({ unique: true })
  uuid: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column({ default: 'unknown' })
  gender: string;

  @Field(() => String)
  @Column({ unique: true, nullable: true })
  email: string;

  @Field(() => String)
  @Column({ unique: true })
  phone: string;

  @Field(() => String)
  @Column({ nullable: true })
  address: string;

  @Field(() => String)
  @Column({ nullable: true })
  city: string;

  @Field(() => String)
  @Column({ nullable: true })
  profileLink: string;

  @Field(() => String)
  @Column()
  type: string;
}
