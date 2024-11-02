import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  BASIC_COPPER_CONTRACT: "0xD6aBD350AEaA3F79e885c5dE817510ceCaA1afA4" as `0x${string}`,
  OR_CONTRACT: "0x1969e08b825f5e48723331Cb47cAa06E1564705B" as `0x${string}`,
  FINE_COPPER_CONTRACT: "0x81FA2Aa63009BF7c1AC58A28E6e7BfE394D810F1" as `0x${string}`,
  SBT_CONTRACT: "0x805B8c83aBE092F39a9Aa88C72a0828d225c36fF" as `0x${string}`
};
