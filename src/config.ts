import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  BASIC_COPPER_CONTRACT: "0xDf1A90Ac5f1bdfDaB191f85a31020E05018471c0" as `0x${string}`,
  SHITTY_COPPER_CONTRACT: "0x7abf162DBD8d704c78Dc5e1392996398BFa3A348" as `0x${string}`,
  FINE_COPPER_CONTRACT: "0xB7f3E6649fD0981Eb596dd3e4a66b9a1556442EA" as `0x${string}`,
  SBT_CONTRACT: "0x3DEa318b6cA289Afa97da74F3d332Ef97FfdA787" as `0x${string}`
};
