import { writeContract } from '@wagmi/core';
import { config } from '@/config';
import { useMutation } from '@tanstack/react-query';
import ShittyCopper from '@/abis/ShittyCopper.json';
import { wagmiConfig } from '@/wagmi';

const useVoteDown = (onError?: any) => {
  return useMutation(
    {
      mutationFn: async ({ to, value }: any) => {
        return await writeContract(wagmiConfig, {
          address: config.SHITTY_COPPER_CONTRACT,
          abi: ShittyCopper,
          functionName: 'transfer',
          args: [to, value]
        });
      }
    },
    onError
  );
};

export default useVoteDown;
