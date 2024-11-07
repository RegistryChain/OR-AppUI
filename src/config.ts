import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  SBT_CONTRACT: "0xbbe28e2b937e1cb08884e749788751e5d7629e0f" as `0x${string}`,
  "StarToken": "0xe830d110ca834f85e9f6d2a68f5dad29cafae429" as `0x${string}`,
  "DownToken": "0xf7904e43ddc725c7c54e064a1d7d39864e4d3179" as `0x${string}`,
  "UpToken": "0x6e054657c7436146f9b661a33f5883fc18bee27a" as `0x${string}`,
  "ShitToken": "0xd3103d45c314d51eb0a960f7935e4d93bf7c944e" as `0x${string}`,
  "HeartToken": "0xcf6ad9a40da988ed014d3d58a9d6fcf25b84700b" as `0x${string}`,
  "TokenController": "0x61f27ed5a040001d887136a25b3c066c5e56782f" as `0x${string}`
};
