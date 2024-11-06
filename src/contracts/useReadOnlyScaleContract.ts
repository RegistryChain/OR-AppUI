import { useMemo } from 'react';
import { config } from '@/config';
import UpToken from '../abis/UpToken.json';
import { publicClient, walletClient } from '@/context/client';
import { getContract } from 'viem';

const useReadOnlyScaleContract = () => {
  const sbtContract = useMemo(() => {
    const contract = getContract({
      address: config.SCALE_TOKEN_ADDRESS,
      abi: UpToken,
      client: {
        public: publicClient,
        wallet: walletClient,
      }
    });
    return contract.read;
  }, []);

  return sbtContract;
};

export default useReadOnlyScaleContract;
