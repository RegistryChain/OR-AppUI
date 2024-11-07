import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  SBT_CONTRACT: "0xd25c1684a741275ee43f1a2a00c0cea9d4dc5762" as `0x${string}`,
  "StarToken": "0x7e6671dbaf5e54f01c6da871addbc3595e325fdd" as `0x${string}`,
  "DownToken": "0x0d8076c8bdc7ee3ae047d5d4be8b337e0ad455c7" as `0x${string}`,
  "UpToken": "0xb0c330cd6028af6598d3aa15246fd944d6c94b94" as `0x${string}`,
  "ShitToken": "0x7e0550e29c1417223e2f71cfa4eebf5c169f74f6" as `0x${string}`,
  "HeartToken": "0x95769cfd70474a7e68a1931ab21c0cbccf5519b8" as `0x${string}`,
  "TokenController": "0xe084bc03c99a41172a02cd7b4549fc39ccdf5806" as `0x${string}`
};
