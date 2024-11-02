import { writeContract } from '@wagmi/core';
import { config } from '@/config';
import { useMutation } from '@tanstack/react-query';
import Upvote from '@/abis/Upvote.json';
import { wagmiConfig } from '@/wagmi';

const useVoteUP = (onError?: any) => {
  return useMutation(
    {
      mutationFn: async ({ to, value }: any) => {
        return await writeContract(wagmiConfig, {
          address: config.FINE_COPPER_CONTRACT,
          abi: Upvote,
          functionName: 'transfer',
          args: [to, value]
        });
      }
    },
    onError
  );
};

export default useVoteUP;
