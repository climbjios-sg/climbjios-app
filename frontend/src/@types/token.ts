export type JwtTokenSet = {
  refreshToken: string;
  accessToken: string;
};

export type RequestJwtTokenSet = Pick<JwtTokenSet, 'refreshToken'>;
export type ResponseJwtTokenSet = JwtTokenSet;
