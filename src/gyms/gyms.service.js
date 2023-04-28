"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymsService = void 0;
const common_1 = require("@nestjs/common");
const gyms_dao_service_1 = require("../database/daos/gyms/gyms.dao.service");
const gymGrades_dao_service_1 = require("../database/daos/gymGrades/gymGrades.dao.service");
const gymsSearch_dao_service_1 = require("../database/daos/gymsSearch/gymsSearch.dao.service");
const passes_dao_service_1 = require("../database/daos/passes/passes.dao.service");
const axios_1 = require("axios");
const cheerio = require("cheerio");
let GymsService = class GymsService {
    constructor(gymsDaoService, gymGradesDaoService, gymsSearchDaoService, passesDaoService) {
        this.gymsDaoService = gymsDaoService;
        this.gymGradesDaoService = gymGradesDaoService;
        this.gymsSearchDaoService = gymsSearchDaoService;
        this.passesDaoService = passesDaoService;
    }
    getAll() {
        return this.gymsDaoService.getAll();
    }
    async getGrades(gymId) {
        const gym = await this.gymsDaoService.findByGymId(gymId);
        if (!gym) {
            throw new common_1.HttpException('Invalid gym id!', 400);
        }
        return this.gymGradesDaoService.findByGymId(gymId);
    }
    async getPasses(gymId) {
        const gym = await this.gymsDaoService.findByGymId(gymId);
        if (!gym) {
            throw new common_1.HttpException('Invalid gym id!', 400);
        }
        return this.passesDaoService.findByGymId(gymId);
    }
    searchGyms(substring) {
        return this.gymsSearchDaoService.searchGyms(substring);
    }
    async getGymDetails(id) {
        const result = await this.gymsDaoService.findByGymId(id);
        if (!result) {
            throw new common_1.HttpException('Invalid gym id!', 404);
        }
        const { openNow, operatingHours } = await scrapeOperatingHours(result.name);
        result.openNow = openNow;
        result.operatingHours = operatingHours;
        return result;
    }
};
GymsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gyms_dao_service_1.GymsDaoService,
        gymGrades_dao_service_1.GymGradesDaoService,
        gymsSearch_dao_service_1.GymsSearchDaoService,
        passes_dao_service_1.PassesDaoService])
], GymsService);
exports.GymsService = GymsService;
async function scrapeOperatingHours(name) {
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
        'Accept-Encoding': 'gzip,deflate,compress',
    };
    const { data } = await axios_1.default.get(`https://www.google.com/search?q=${name}&gl=sg&hl=en`, {
        headers: header,
    });
    let $ = cheerio.load(data);
    let openNow = $('.JjSWRd').text();
    let hours = [];
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
//# sourceMappingURL=gyms.service.js.map