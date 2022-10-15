export type JwtTokenSet = {
  refreshToken: string;
  accessToken: string;
};

export type JwtTokenSetRequest = Pick<JwtTokenSet, 'refreshToken'>;
export type JwtTokenSetResponse = JwtTokenSet;
