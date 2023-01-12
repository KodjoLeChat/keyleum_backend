import { ObjectType } from '@nestjs/graphql';
import { LessorUpdateOutput } from './lessor_update.dto';

@ObjectType()
export class LessorDeleteOutPut extends LessorUpdateOutput {}
