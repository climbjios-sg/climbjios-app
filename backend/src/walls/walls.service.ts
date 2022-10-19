import { Injectable } from '@nestjs/common';
import { WallsDaoService } from '../database/daos/walls/walls.dao.service';

@Injectable()
export class WallsService {
  constructor(private readonly wallsDaoService: WallsDaoService) {}

  getAll() {
    return this.wallsDaoService.getAll();
  }
}
