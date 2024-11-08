// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error SBT__NotDownToken();
error SBT__NotUpToken();
error SBT__NotScaleToken();
error SBT__Soulbound();

contract SBT is ERC1155 {
    using Math for uint256;

    mapping(address => uint256) tokenToId;
    uint256 tokenCount = 1;
    constructor() ERC1155("") {

    }

    function initializeToken() external {
        if (tokenToId[msg.sender] == 0) {
            tokenToId[msg.sender] = tokenCount;
            tokenCount += 1;
        }
    }

    function uri(uint256 tokenId) public pure override returns (string memory) {
        if (tokenId == 1) {
            return
                "ipfs://bafkreig5jsygnxekfhdjsp6qw3uoag2rxg4khnnfc2h4pvx47dczmbg2pm";
        } else if (tokenId == 2) {
            return
                "ipfs://bafkreic5b7p2obdpzdho22h2wzvvukjpfxdk3uk3viat6nescsxlj5d45y";
        }

        return "";
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public override {
        if (from != address(0) && to != address(0)) {
            revert SBT__Soulbound();
        }

        super.safeTransferFrom(from, to, id, value, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public override {
        if (from != address(0) && to != address(0)) {
            revert SBT__Soulbound();
        }

        super.safeBatchTransferFrom(from, to, ids, values, data);
    }

    function mintRatingSbt(address wallet, uint256 amount) public {
        require(tokenToId[msg.sender] != 0);
        _mint(wallet, tokenToId[msg.sender], amount, "");

        emit rated(wallet, tokenToId[msg.sender], amount);
    }


    event rated(address indexed from, uint256 tokenId, uint256 amount);
}
