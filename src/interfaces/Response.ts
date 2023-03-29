export interface PaginationResponse<T> {
  total: number;
  items: T[];
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpireAt: string;
  refreshTokenExpireAt: string;
}

export interface ResultResponse<T> {
  rs: T;
}

export interface ErrorResponse {
  detail: {
    code: number;
    msg: string;
  };
}
