import { writeContract } from '@wagmi/core';
import { config } from '@/config';
import { useMutation } from '@tanstack/react-query';
import Basic from '@/abis/Basic.json';
import { wagmiConfig } from '@/wagmi';

const useMintBasic = (onError?: any) => {
  return useMutation(
    {
      mutationFn: async ({ to, value }: any) => {
        return await writeContract(wagmiConfig, {
          address: config.TokenController,
          abi: Basic,
          functionName: 'mintFromFaucet',
          args: []
        });
      }
    },
    onError
  );
};

export default useMintBasic;
