import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { SncsCertificationModel } from '../../../database/models/sncsCertification.model';

@Injectable()
export class SncsCertificationsDaoService {
  constructor(
    @Inject('SncsCertificationModel')
    private sncsCertificationModel: ModelClass<SncsCertificationModel>,
  ) {}

  getAll() {
    return this.sncsCertificationModel.query().select(['id', 'name']);
  }

  findById(id: number) {
    return this.sncsCertificationModel.query().findById(id);
  }
}
