import { writeContract } from '@wagmi/core';
import { config } from '@/config';
import { useMutation } from '@tanstack/react-query';
import Downvote from '@/abis/Downvote.json';
import { wagmiConfig } from '@/wagmi';

const useVoteDown = (onError?: any) => {
  return useMutation(
    {
      mutationFn: async ({ to, value }: any) => {
        return await writeContract(wagmiConfig, {
          address: config.OR_CONTRACT,
          abi: Downvote,
          functionName: 'transfer',
          args: [to, value]
        });
      }
    },
    onError
  );
};

export default useVoteDown;
