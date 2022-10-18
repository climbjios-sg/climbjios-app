import { Injectable } from '@nestjs/common';
import { PronounsDaoService } from '../database/daos/pronouns/pronouns.dao.service';

@Injectable()
export class PronounsService {
  constructor(private readonly pronounsDaoService: PronounsDaoService) {}

  getAll() {
    return this.pronounsDaoService.getAll();
  }
}
