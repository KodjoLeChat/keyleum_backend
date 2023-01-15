import { Field, InterfaceType, registerEnumType } from '@nestjs/graphql';
import { Gender } from 'src/common/enum/gender.enum';
import { UserState } from 'src/common/enum/states.enum';
import { UserType } from 'src/common/enum/types.enum';
import { Node } from 'src/pagination/models/node.model';
import { Column } from 'typeorm';

registerEnumType(UserState, { name: 'UserState' });

registerEnumType(UserType, { name: 'UserType' });

registerEnumType(Gender, { name: 'Gender' });
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

  @Field(() => Gender)
  @Column({ default: Gender.unknown })
  gender: Gender;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  email?: string;

  @Field(() => String)
  @Column({ unique: true })
  primaryPhoneNumber: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profileLink?: string;

  @Field(() => UserType)
  @Column()
  type: UserType;

  @Field(() => UserState)
  @Column({ default: UserState.enabled })
  state: UserState;
}
