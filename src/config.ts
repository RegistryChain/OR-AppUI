import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  BASIC_COPPER_CONTRACT: "0x70EDFE2C780e411Bc73247B0B89c2920504c9399" as `0x${string}`,
  OR_CONTRACT: "0x3A3f895E52bd09f77d1333E7B45833501f2a10DE" as `0x${string}`,
  FINE_COPPER_CONTRACT: "0x08f739157538Ea5A14DFc6A1F2e73D78c0C1cC35" as `0x${string}`,
  SBT_CONTRACT: "0xfAC2671033680BdF764019966a514E1e62848d7C" as `0x${string}`
};
