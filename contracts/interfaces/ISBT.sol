// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface ISBT is IERC1155 {
    function mintRatingSbt(address wallet, uint256 amount) external;
    function initializeToken() external;
}
