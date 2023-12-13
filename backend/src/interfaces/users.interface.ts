export interface User {
  uuid?: string;
  username: string;
  email: string;
  password: string;

  verificationCode: string;
  verifiedAt: Date;
  isVerified: string;
}


export interface UserStats {
  rocks: number;
  papers: number;
  scissors: number;
  wins: number;
  games: number;
  points: number;
  level: number;
  exp: number;
}
