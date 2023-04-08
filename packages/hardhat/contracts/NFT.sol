// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VoteNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private tokenIds;

  /**
   * @dev _baseTokenURI for computing {tokenURI}. If set, the resulting URI for each
   * token will be the concatenation of the `baseURI` and the `tokenId`.
   */
  string _baseTokenURI;

  event Minted(uint256 indexed tokenId, address indexed addr);

  constructor() ERC721("VoteNFT", "VNFT") {}

  function mintUser(address addr) public onlyOwner {
    uint256 newTokenId = tokenIds.current();
    _mint(addr, newTokenId);
    tokenIds.increment();
    emit Minted(newTokenId, addr);
  }

  function mintMany(address[] memory addrList) external onlyOwner {
    for (uint256 i = 0; i < addrList.length; i++) {
      mintUser(addrList[i]);
    }
  }
}
