import { useMemo } from 'react';
import { config } from '@/config';
import RepToken from '../abis/RepToken.json';
import { publicClient, walletClient } from '@/context/client';
import { getContract } from 'viem';

const useReadOnlyStarContract = () => {
  const sbtContract = useMemo(() => {
    const contract = getContract({
      address: config.StarToken,
      abi: RepToken,
      client: {
        public: publicClient,
        wallet: walletClient,
      }
    });
    return contract.read;
  }, []);

  return sbtContract;
};

export default useReadOnlyStarContract;
