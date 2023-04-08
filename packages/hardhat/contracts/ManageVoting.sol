//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Voting.sol";
import "./ManageNFT.sol";
import "hardhat/console.sol";

contract ManageVoting {
  address public owner;
  string[] public nameElections;
  bool isControlledVoting;
  ManageVotingNFT voteNFT;

  //sets owner,
  constructor(address nft) {
    owner = msg.sender;
    voteNFT = ManageVotingNFT(nft);
  }

  uint256 public electionsCount = 0;

  //EVENTS
  event CreateElection(address sender, string _electionName);
  event AddVoteItem(address sender, string _electionName, string _name);
  event Vote(address sender, string _electionName, uint256 _candidateID);
  event ChangeVoteStatus(address sender, string _electionName);
  event EnableVoting(address sender);

  //MAPPING
  mapping(string => Voting) public elections;

  //MODIFIERS
  modifier onlyChairman(string memory _electionName) {
    require(elections[_electionName].owner() == msg.sender, "Chairman only access");
    _;
  }

  modifier canVote(string memory _electionName) {
    uint256 balance = voteNFT.getB(_electionName, msg.sender);
    require(balance > 0, "You are not eligble to vote");
    _;
  }

  //FUNCTIONS

  function addVotingAccess(address _addr, string memory _electionName) public onlyChairman(_electionName) {
    voteNFT.mint(_electionName, _addr);
  }

  function addManyVotingAccess(
    address[] memory _addrList,
    string memory _electionName
  ) public onlyChairman(_electionName) {
    voteNFT.mintMany(_electionName, _addrList);
  }

  function enableVoting(string memory _electionName, uint duration) public onlyChairman(_electionName) {
    elections[_electionName].enableVoting();
    uint time = block.timestamp + duration;
    elections[_electionName].setTime(time);
    emit EnableVoting(msg.sender);
  }

  //Create new instance of the voting contract
  //only chairman can create election
  function createElection(string memory _electionName, string memory status) public returns (bool) {
    Voting myVote = new Voting();
    voteNFT.createElectionNFT(_electionName);
    elections[_electionName] = myVote;
    elections[_electionName].setVotingAccess(status);
    elections[_electionName].setOwner(msg.sender);
    //increment the number of elections added
    electionsCount++;
    nameElections.push(_electionName);
    emit CreateElection(msg.sender, _electionName);
    return true;
  }

  //add candidate
  function addItem(
    string memory _electionName,
    string memory _name,
    string memory _img
  ) public onlyChairman(_electionName) returns (bool) {
    elections[_electionName].addItem(_name, _img);
    emit AddVoteItem(msg.sender, _electionName, _name);
    return true;
  }

  //stakeholders only vote
  function vote(string memory _electionName, uint256 _itemID) public canVote(_electionName) returns (bool) {
    elections[_electionName].vote(_itemID, msg.sender);
    emit Vote(msg.sender, _electionName, _itemID);
    return true;
  }

  //get list of all election
  function getAllElection() public view returns (string[] memory) {
    return nameElections;
  }

  //get list of all candidate for election name argument
  function getAllItems(string memory _electionName) public view returns (Voting.Item[] memory) {
    return elections[_electionName].getAllItems();
  }

  function getStatus(string memory _electionName) public view returns (Voting.VotingStatus) {
    return elections[_electionName].getEndStatus();
  }
}
