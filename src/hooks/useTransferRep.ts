import { writeContract } from '@wagmi/core';
import { useMutation } from '@tanstack/react-query';
import RepToken from '@/abis/RepToken.json';
import { wagmiConfig } from '@/wagmi';

const useTransferRep = (onError?: any) => {
  return useMutation(
    {
      mutationFn: async ({ token, to, value }: any) => {
        return await writeContract(wagmiConfig, {
          address: token,
          abi: RepToken,
          functionName: 'transfer',
          args: [to, value]
        });
      }
    },
    onError
  );
};

export default useTransferRep;
