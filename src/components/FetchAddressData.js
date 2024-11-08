import axios from 'axios';
import { createPublicClient, getContract, http, parseAbi } from 'viem';
import {  bsc } from 'wagmi/chains';


  
export const etherscanTransactions = async (address) => {
    try {
    const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
    const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`
      );
        return response.data?.result
  } catch (error) {
      console.error('Error fetching Etherscan data:', error);
  }
};

export const etherBalancesCurrent = async (addressList) => {
  try {
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
  const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balanceMulti&address=${addressList.join(',')}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`
    );

    if (response.data.status === '1' && response.data.result) {
      // Process the result into an object with addresses as keys and balances as values
      const balances = {};
      response.data.result.forEach(entry => {
        balances[entry.account] = entry.balance;
      });
      return balances;
    } else {
      console.error('Error fetching balances:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching Etherscan data:', error);
}
};

export const binanceAttestation = async (address) => {
    const bscClient = 
        createPublicClient({
          chain: bsc,
          transport: http('https://bsc-dataseed.binance.org'), // Use the appropriate BSC node URL
        })

    try {
      const babtContract = getContract({
        address: '0x2b09d47d550061f995a3b5c6f0fd58005215d7c8',
        abi: parseAbi(['function balanceOf(address) view returns (uint256)','function tokenIdOf(address) view returns (uint256)']),
        client: bscClient,
      });
      const hasBalance = await babtContract.read.balanceOf([address])
      let result = {}
      if (Number(hasBalance) > 0) {
        result = await babtContract.read.tokenIdOf([address]);
      }
      return result

    } catch (error) {
      console.error('Error fetching Binance BABT attestation:', error);
    }
  };
  // Get full gitcoin passport queried list, map thru for the address existing and their scores
  export const gitcoinPassportExistingScores = async () => {
    const gitcoinApiKey = process.env.GITCOIN_API_KEY;
    const scorerId = process.env.GITCOIN_SCORER_ID;
    const response = await axios.get(
      'https://api.scorer.gitcoin.co/registry/score/' + scorerId,
      {
        headers: {
          'X-API-KEY': gitcoinApiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.items
  }



  // Function to fetch Gitcoin Passport score, if not in existing list
  export const gitcoinPassportScore = async (address, setAddressData) => {


    try {
      const gitcoinApiKey = process.env.GITCOIN_API_KEY;
      const scorerId = process.env.GITCOIN_SCORER_ID;
      const response = await axios.post(
        'https://api.scorer.gitcoin.co/registry/submit-passport',
        {
          address,
          scorer_id: scorerId,
        },
        {
          headers: {
            'X-API-KEY': gitcoinApiKey,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data
      
    } catch (error) {
      console.error('Error fetching Gitcoin Passport score:', error);
    }
  };
