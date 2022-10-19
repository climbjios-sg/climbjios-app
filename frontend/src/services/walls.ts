import { BE_API } from '../utils/api';
import authorizedAxios from '../utils/authorizedAxios';
import { Wall } from 'src/@types/wall';

export const getWalls = () => authorizedAxios.get<Wall[]>(BE_API.walls);
