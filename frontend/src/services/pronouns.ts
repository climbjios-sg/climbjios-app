import authorizedAxios from 'src/utils/axios/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { PronounResponse } from 'src/@types/pronoun';

export const getPronounList = () => authorizedAxios.get<PronounResponse[]>(BE_API.pronouns);
