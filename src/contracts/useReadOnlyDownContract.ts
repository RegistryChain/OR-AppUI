import { useMemo } from 'react';
import { config } from '@/config';
import DownToken from '../abis/DownToken.json';
import { publicClient, walletClient } from '@/context/client';
import { getContract } from 'viem';

const useReadOnlyDownContract = () => {
  const sbtContract = useMemo(() => {
    const contract = getContract({
      address: config.DOWN_TOKEN_ADDRESS,
      abi: DownToken,
      client: {
        public: publicClient,
        wallet: walletClient,
      }
    });
    return contract.read;
  }, []);

  return sbtContract;
};

export default useReadOnlyDownContract;
