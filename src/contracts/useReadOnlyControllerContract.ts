import { useMemo } from 'react';
import { config } from '@/config';
import Basic from '../abis/Basic.json';
import { publicClient, walletClient } from '@/context/client';
import { getContract } from 'viem';

const useReadOnlyControllerContract = () => {
  const controllerContract = useMemo(() => {
    const contract = getContract({
      address: config.TokenController,
      abi: Basic,
      client: {
        public: publicClient,
        wallet: walletClient,
      }
    });
    return contract.read;
  }, []);

  return controllerContract;
};

export default useReadOnlyControllerContract;
