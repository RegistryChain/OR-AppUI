import { useMemo } from 'react';
import { config } from '@/config';
import SBT from '../abis/SBT.json';
import { publicClient, walletClient } from '@/context/client';
import { getContract } from 'viem';

const useReadOnlySBTContract = () => {
  const sbtContract = useMemo(() => {
    const contract = getContract({
      address: config.SBT_CONTRACT,
      abi: SBT,
      client: {
        public: publicClient,
        wallet: walletClient,
      }
    });
    return contract.read;
  }, []);

  return sbtContract;
};

export default useReadOnlySBTContract;
