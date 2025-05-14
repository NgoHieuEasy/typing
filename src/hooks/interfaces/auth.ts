export interface AuthResponse {
  user: IUser;
  tokens: Tokens;
}

export interface IUser {
  twoFA: {
    enabled: boolean;
    secret: string;
  };
  referrerIds: string[];
  isBlock: boolean;
  isBlockWithdraw: boolean;
  USDT: number;
  claimToken: number;
  depositWallet: string;
  inviteCode: string;
  totalSale: number;
  level: number;
  lockTime: number;
  wallet: string;
  id: string;
}

export interface Tokens {
  access: TokenInfo;
  refresh: TokenInfo;
}

export interface TokenInfo {
  token: string;
  expires: string; // ISO date string
}
