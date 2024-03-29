import { HttpException, Injectable } from '@nestjs/common';
import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { GymGradesDaoService } from '../database/daos/gymGrades/gymGrades.dao.service';
// idk why this keeps being automatically changed to an absolute import which causes erros
import { GymsSearchDaoService } from '../database/daos/gymsSearch/gymsSearch.dao.service';
import { PassesDaoService } from '../database/daos/passes/passes.dao.service';

import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class GymsService {
  constructor(
    private readonly gymsDaoService: GymsDaoService,
    private readonly gymGradesDaoService: GymGradesDaoService,
    private readonly gymsSearchDaoService: GymsSearchDaoService,
    private readonly passesDaoService: PassesDaoService,
  ) {}

  getAll() {
    return this.gymsDaoService.getAll();
  }

  async getGrades(gymId: number) {
    const gym = await this.gymsDaoService.findByGymId(gymId);
    if (!gym) {
      throw new HttpException('Invalid gym id!', 400);
    }
    return this.gymGradesDaoService.findByGymId(gymId);
  }

  async getPasses(gymId: number) {
    const gym = await this.gymsDaoService.findByGymId(gymId);
    if (!gym) {
      throw new HttpException('Invalid gym id!', 400);
    }
    return this.passesDaoService.findByGymId(gymId);
  }

  searchGyms(substring: string) {
    return this.gymsSearchDaoService.searchGyms(substring);
  }

  async getGymDetails(id: number) {
    const result = await this.gymsDaoService.findByGymId(id);
    if (!result) {
      throw new HttpException('Invalid gym id!', 404);
    }

    const { openNow, operatingHours } = await scrapeOperatingHours(result.name);
    result.openNow = openNow;
    result.operatingHours = operatingHours;

    return result;
  }
}

interface OperatingHours {
  openNow: string;
  operatingHours: string[];
}

async function scrapeOperatingHours(name: string): Promise<OperatingHours> {
  const selectRandom = () => {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
    ];
    var randomNumber = Math.floor(Math.random() * userAgents.length);
    return userAgents[randomNumber];
  };
  let user_agent = selectRandom();
  let header = {
    'User-Agent': `${user_agent}`,
    // got "unexepcted end of file" with error code 400 after changing to Yarn 1x
    // fixed according to https://stackoverflow.com/a/74735197/7577786
    'Accept-Encoding': 'gzip,deflate,compress',
  };

  const { data } = await axios.get(
    `https://www.google.com/search?q=${name}&gl=sg&hl=en`,
    {
      headers: header,
    },
  );
  let $ = cheerio.load(data);
  let openNow = $('.JjSWRd').text();
  let hours: string[] = [];
  $('.WgFkxc > tbody').each((_i, el) => {
    $(el)
      .find('tr')
      .each((_i_1, e) => {
        let rowText = $(e).text().replace('day', 'day ');
        hours.push(rowText);
      });
  });
  return {
    openNow: openNow,
    operatingHours: hours,
  };
}
