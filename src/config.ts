import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  BASIC_TOKEN_ADDRESS: "0x7dce17df45374e7812a74c193b2c148054b8bef2" as `0x${string}`,
  DOWN_TOKEN_ADDRESS: "0xec4f1e2b9686cb94633fcd842d7b8ec30816085c" as `0x${string}`,
  UP_TOKEN_ADDRESS: "0x37c313678cd365c19dfc23388407bc6b08f9f0a0" as `0x${string}`,
  SBT_CONTRACT: "0x0f1d2e7566addae6712bf30b0dbc53a980859966" as `0x${string}`
};
