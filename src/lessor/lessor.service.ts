import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessorCreateInput, LessorSetOutput } from './dtos/lessor_create.dto';
import { Lessor } from './models/lessor.model';

@Injectable()
export class LessorService {
  constructor(
    @InjectRepository(Lessor)
    private readonly lessorRepository: Repository<Lessor>,
  ) {}

  async createLessor(input: LessorCreateInput): Promise<LessorSetOutput> {
    const newLessor = this.lessorRepository.create(input);
    const lessor = await newLessor.save();
    return { lessor };
  }

  async getLessor(id: string): Promise<LessorSetOutput> {
    const lessor = await this.lessorRepository.findOne({ where: { id: id } });
    return { lessor };
  }
}
