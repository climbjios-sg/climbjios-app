import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { PronounResponse } from 'src/@types/pronoun';

export const getPronounList = () => authorizedAxios.get<PronounResponse[]>(BE_API.pronouns);
