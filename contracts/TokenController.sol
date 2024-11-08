// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./interfaces/IReputationToken.sol";

contract TokenController is Initializable, OwnableUpgradeable {
    IReputationToken public downToken;
    IReputationToken public upToken;
    IReputationToken public starToken;
    IReputationToken public shitToken;
    IReputationToken public heartToken;

    mapping(address => bool) public faucetMinted;

    function initialize() public initializer {
        __Ownable_init(msg.sender);
    }

    function mintFromFaucet() external {
        require(faucetMinted[msg.sender] == false);
        downToken.mint(msg.sender, 500 * 10 ** 18);
        upToken.mint(msg.sender, 500 * 10 ** 18);
        starToken.mint(msg.sender, 500 * 10 ** 18);
        shitToken.mint(msg.sender, 500 * 10 ** 18);
        heartToken.mint(msg.sender, 500 * 10 ** 18);
        faucetMinted[msg.sender] = true;
    }

    function setReputationTokens(
        address _downToken,
        address _upToken,
        address _starToken,
        address _shitToken,
        address _heartToken
        
    ) external onlyOwner {

        downToken = IReputationToken(_downToken);
        upToken = IReputationToken(_upToken);
        starToken = IReputationToken(_starToken);
        shitToken = IReputationToken(_shitToken);
        heartToken = IReputationToken(_heartToken);
    }

    function setLiquidityPool(address _liquidityPool) external onlyOwner {

    }

    function transfer(
        address to,
        uint256 value
    ) public  returns (bool) {
        return true;

    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public  returns (bool) {
        return true;
    }

    function balanceOf(address account) public view  returns (uint256) {
        return 0;
    }

    function convertToUpToken(uint256 amount) public returns (uint256) {


        return amount;
    }

    function convertToDownToken(uint256 amount) public returns (uint256) {


        return amount;
    }

    function _handleTransfer(address from, address to, uint256 value) internal {

    }

    function _calculateReputationTransfers(
        address from,
        uint256 value
    ) internal view returns (uint256 scpAmount, uint256 fcpAmount) {

    }
}
