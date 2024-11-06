import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  BASIC_TOKEN_ADDRESS: "0xe9cca7712f00d3b859de1abf1ea29c2a24ff213e" as `0x${string}`,
  DOWN_TOKEN_ADDRESS: "0x25331b3b8a38d85797c235dc9f0809070b3b177b" as `0x${string}`,
  UP_TOKEN_ADDRESS: "0x0862af5cebdc69958bdfca81da389609eac1f17f" as `0x${string}`,
  SCALE_TOKEN_ADDRESS: "0xd981089cea4a208bf5184ec00a578c96261edf98" as `0x${string}`,
  SBT_CONTRACT: "0x5914180fcf4e4fd6d39062070356d7ced0713223" as `0x${string}`,
};
