//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFT.sol";

contract ManageVotingNFT {
  mapping(string => VoteNFT) public electionsNFT;

  function createElectionNFT(string memory _electionName) public returns (bool) {
    VoteNFT voteNFT = new VoteNFT();
    electionsNFT[_electionName] = voteNFT;
    return true;
  }

  function getB(string memory _electionName, address addr) public view returns (uint) {
    uint balance = electionsNFT[_electionName].balanceOf(addr);
    return balance;
  }

  function mint(string memory _electionName, address addr) public {
    electionsNFT[_electionName].mintUser(addr);
  }

  function mintMany(string memory _electionName, address[] memory addrList) public {
    electionsNFT[_electionName].mintMany(addrList);
  }
}
