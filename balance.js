const { Web3 } = require('web3');
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://newest-winter-field.quiknode.pro/0c9b41aa50b4ea1fdd9e62a80dc38290f3fdd0c8",
  ),
);

const balanceOfABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// ShittyCopper  token contract
const shittyCopperContract = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const fineCopperContract = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// A token holder
const tokenHolder = "0x075e72a5eDf65F0A5f44699c7654C1a76941Ddc8";
const contract = new web3.eth.Contract(balanceOfABI, shittyCopperContract);


async function getTokenBalance() {
  const result = await contract.methods.balanceOf(tokenHolder).call();
  const formattedResult = web3.utils.fromWei(result, "ether");
  console.log(formattedResult);
}

getTokenBalance();