import { Injectable } from '@nestjs/common';
import { ColorsDaoService } from '../database/daos/colors/colors.dao.service';

@Injectable()
export class ColorsService {
  constructor(private readonly colorsDaoService: ColorsDaoService) {}

  getAll() {
    return this.colorsDaoService.getAll();
  }
}
