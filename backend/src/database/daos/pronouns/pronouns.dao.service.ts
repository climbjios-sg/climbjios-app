import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { PronounModel } from '../../models/pronoun.model';

@Injectable()
export class PronounsDaoService {
  constructor(
    @Inject('PronounModel') private PronounModel: ModelClass<PronounModel>,
  ) {}

  getAll() {
    return this.PronounModel.query().select(['id', 'name']);
  }

  findById(id: number) {
    return this.PronounModel.query().findById(id);
  }
}
