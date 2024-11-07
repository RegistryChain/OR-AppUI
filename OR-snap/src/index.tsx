// @ts-nocheck

import { Box, Text, Bold, Image } from '@metamask/snaps-sdk/jsx';

const tokenContracts = {
  "StarToken": "0xe830d110ca834f85e9f6d2a68f5dad29cafae429",
  "DownToken": "0xf7904e43ddc725c7c54e064a1d7d39864e4d3179",
  "UpToken": "0x6e054657c7436146f9b661a33f5883fc18bee27a",
  "ShitToken": "0xd3103d45c314d51eb0a960f7935e4d93bf7c944e",
  "HeartToken": "0xcf6ad9a40da988ed014d3d58a9d6fcf25b84700b",
  "TokenController": "0x61f27ed5a040001d887136a25b3c066c5e56782f"
}

export const onTransaction: any = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  const includePassport0 = true // This factor changes whether or not we should include ratings from users with no passport score
  let gitcoinPassport: any[] = []
  if (includePassport0) {
    gitcoinPassport = await gitcoinPassportExistingScores()
  }

  //IMPORTANT - check if transaction.method is transfer/transferFrom. If so the padded address is recipient
  let targetAddress = transaction.to
  // targetAddress = "0x0219DB862b2b48969Df880BCd134e192Fd306bfA"
  if (transaction.data.slice(0,10) === '0xa9059cbb') {
    targetAddress = '0x' + transaction.data.slice(34,74)
  }
  if (transaction.data.slice(0,10) === '0x23b872dd') {
    targetAddress = '0x' + transaction.data.slice(98,138)
  }

  const methodSelector = "0xb879e026"; // Correct 4-byte function selector
  // Pad the address to 32 bytes
  const paddedAddress: any = targetAddress.slice(2).padStart(64, '0'); // IMPORTANT - TX.TO IF ITS NOT transfer/transferFrom
  const methodArg = methodSelector + paddedAddress;

  const upTokens = await ethereum.request({
    method: "eth_call",
    params: [{
      from: transaction.from,
      to: tokenContracts.UpToken,
      data: methodArg,
      accessList: []
    }, null]
  })

  const downTokens = await ethereum.request({
    method: "eth_call",
    params: [{
      from: transaction.from,
      to: tokenContracts.DownToken,
      data: methodArg,
      accessList: []
    }, null]
  })


  const heartTokens = await ethereum.request({
    method: "eth_call",
    params: [{
      from: transaction.from,
      to: tokenContracts.HeartToken,
      data: methodArg,
      accessList: []
    }, null]
  })

  const shitTokens = await ethereum.request({
    method: "eth_call",
    params: [{
      from: transaction.from,
      to: tokenContracts.ShitToken,
      data: methodArg,
      accessList: []
    }, null]
  })


  const scaleTokens = await ethereum.request({
    method: "eth_call",
    params: [{
      from: transaction.from,
      to: tokenContracts.StarToken,
      data: methodArg,
      accessList: []
    }, null]
  })

  const senders: any = {}
  const copyObj: any = {up: 0, down: 0, scale: 0, shit: 0, heart: 0}

  const up = decodeTuple(upTokens)
  let upScore = 0
  const upAddrs = up.addresses
  upAddrs.forEach((address, idx) => {
      //use address to query the interpreters, calculate a score modifer
      up.vals[idx]
      upScore += Number(up.vals[idx])
      if (!senders[address]) {
        senders[address] = {...copyObj}
      }
      senders[address].up += upScore 

  })

  const down = decodeTuple(downTokens)
  let downScore = 0
  const downAddrs = down.addresses
  downAddrs.forEach((address, idx) => {
      //use address to query the interpreters, calculate a score modifer
      down.vals[idx]
      downScore += Number(down.vals[idx])
      if (!senders[address]) {
        senders[address] = {...copyObj}
      }
      senders[address].down += downScore 
  })

  const heart = decodeTuple(heartTokens)
  let heartScore = 0
  const heartAddrs = heart.addresses
  let heartVis = null
  heartAddrs.forEach((address, idx) => {
      //use address to query the interpreters, calculate a score modifer
      heart.vals[idx]
      heartScore += Number(heart.vals[idx])
      if (!senders[address]) {
        senders[address] = {...copyObj}
      }
      senders[address].heart += heartScore 

  })

  

  const shit = decodeTuple(shitTokens)
  let shitScore = 0
  const shitAddrs = shit.addresses
  let shitVis = null
  shitAddrs.forEach((address, idx) => {
      //use address to query the interpreters, calculate a score modifer
      shit.vals[idx]
      shitScore += Number(shit.vals[idx])
      if (!senders[address]) {
        senders[address] = {...copyObj}
      }
      senders[address].shit += shitScore 

  })

  const scale = decodeTuple(scaleTokens)
  let scaleScore = 0
  const scaleAddrs = scale.addresses
  let scaleVis = null
  let nonGcPpScaleCount = scaleAddrs.length

  scaleAddrs.forEach((address, idx) => {
      //use address to query the interpreters, calculate a score modifer
      scale.vals[idx]
      scaleScore += Number(scale.vals[idx])
      if (!senders[address]) {
        senders[address] = {...copyObj}
      }
      senders[address].scale = Number(scale.vals[idx]) 
  })

  scaleScore = scaleScore/nonGcPpScaleCount

  
  let gcPpUp = 0
  let gcPpDown = 0
  let gcPpHeart = 0
  let gcPpShit = 0
  let gcPpScale = 0
  let gcScaleCount = 0;
  const allPromises: any[] = []
  if (includePassport0) {
    Object.keys(senders).forEach(sender => {
      const existing = gitcoinPassport.find((x: any) => x.address === sender)
      let gitcoinPromise = Promise.resolve()
      
      if (existing) {
        if (Number(existing?.score) > 0) {
          gcPpUp += senders[sender].up
          gcPpDown += senders[sender].down
          gcPpShit += senders[sender].shit
          gcPpHeart += senders[sender].heart
          gcPpScale += senders[sender].scale
          gcScaleCount += 1

        }
      }
          
      // Store promises in allPromises array along with the sender key
      allPromises.push(gitcoinPromise)
      
  
    })
    await Promise.all(allPromises);
  }

  if (gcScaleCount > 0) {
    gcPpScale = gcPpScale/gcScaleCount
  }

  return {
      content: (<>
        <Box>
          <Text><Bold>
            Ratings given to this address by addresses with a Gitcoin passport score:
            </Bold></Text>
          <Text>{String.fromCodePoint(0x1F44D)} <Bold>{gcPpUp/10 **18 + ''}</Bold></Text>
          <Text>{String.fromCodePoint(0x1F44E)} <Bold>{gcPpDown/10 **18 + ''}</Bold></Text>
          <Text>{String.fromCodePoint(0x2B50)} <Bold>{gcPpScale/10**18 + ''}</Bold></Text>
          <Text>{String.fromCodePoint(0x1FA77)} <Bold>{gcPpHeart/10**18 + ''}</Bold></Text>
          <Text>{String.fromCodePoint(0x1F4A9)} <Bold>{gcPpShit/10**18 + ''}</Bold></Text>
          <Text><Bold>
            All Ratings given to this address
            </Bold></Text>
          <Text>{String.fromCodePoint(0x1F44D)} <Bold>{upScore/10 **18 + ""}</Bold></Text>
          <Text>{String.fromCodePoint(0x1F44E)} <Bold>{downScore/10 **18 + ""}</Bold></Text>
          <Text>{String.fromCodePoint(0x2B50)} <Bold>{scaleScore/10 **18 + ""}</Bold></Text>
          <Text>{String.fromCodePoint(0x1FA77)} <Bold>{heartScore/10 **18 + ""}</Bold></Text>
          <Text>{String.fromCodePoint(0x1F4A9)} <Bold>{shitScore/10 **18 + ""}</Bold></Text>
          <Text>{JSON.stringify(senders)}</Text>
        </Box>
        </>) as any
    }
};


function decodeTuple(encodedData: any) {
  // Remove '0x' prefix if present
  if (encodedData.startsWith("0x")) {
    encodedData = encodedData.slice(2);
  }

  // Helper function to parse 32-byte chunks
  function getBytes(data: any, start: any, length = 64) {
    return data.slice(start, start + length);
  }

  // Parse the offsets (first 64 hex chars for each array's offset)
  const addressesOffset = parseInt(getBytes(encodedData, 0), 16) * 2;
  const uint256Offset = parseInt(getBytes(encodedData, 64), 16) * 2;

  // Parse address array length
  const addressesLength = parseInt(getBytes(encodedData, addressesOffset), 16);
  const addresses = [];
  let currentAddressOffset = addressesOffset + 64; // Move past the length field

  for (let i = 0; i < addressesLength; i++) {
    const address = "0x" + getBytes(encodedData, currentAddressOffset).slice(24); // Keep last 40 hex chars (20 bytes)
    addresses.push(address);
    currentAddressOffset += 64; // Move to the next 32-byte chunk
  }

  // Parse uint256 array length
  const uint256Length = parseInt(getBytes(encodedData, uint256Offset), 16);
  const uint256Array = [];
  let currentUint256Offset = uint256Offset + 64; // Move past the length field

  for (let i = 0; i < uint256Length; i++) {
    const uint256Value = BigInt("0x" + getBytes(encodedData, currentUint256Offset)).toString();
    uint256Array.push(uint256Value);
    currentUint256Offset += 64; // Move to the next 32-byte chunk
  }

  // Return the decoded tuple
  return { addresses, vals: uint256Array };
}

// Function to fetch existing Gitcoin Passport scores
export const gitcoinPassportExistingScores = async () => {
  
  const scorerId = "8195"
  const gitcoinApiKey =  "LvYOPkBN.En8SN25VOyLOfDrpWo3xZkjgrrhVAIvZ"

  try {
    const response = await fetch(
      `https://api.scorer.gitcoin.co/registry/score/${scorerId}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': gitcoinApiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching existing scores: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching Gitcoin Passport existing scores:', error);
    return null;
  }
};

// Function to fetch Gitcoin Passport score for a specific address
export const gitcoinPassportScore = async (address: any) => {
  
  const scorerId = "8195"
  const gitcoinApiKey =  "LvYOPkBN.En8SN25VOyLOfDrpWo3xZkjgrrhVAIvZ"

  try {
    const response = await fetch(
      'https://api.scorer.gitcoin.co/registry/submit-passport',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': gitcoinApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          scorer_id: scorerId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching passport score: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Gitcoin Passport score:', error);
    return null;
  }
};