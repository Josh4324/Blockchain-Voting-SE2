//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

contract Voting {
  //counter for every candidate; will form the id in the mapping
  uint256 itemCount = 0;
  uint256 public time;
  address public owner;

  //the state of the voting
  enum VotingStatus {
    ready,
    ongoing,
    ended
  }

  VotingStatus public status;

  string public votingAccess;

  constructor() {
    status = VotingStatus.ready;
  }

  //EVENTS
  //events for voting and add candidate
  event Additem(string name);

  //event for voting, takes in candidate ID
  event Voted(uint256 id);

  //candidates information
  struct Item {
    uint256 id;
    string name;
    uint256 vote;
    string imgUrl;
  }

  //MAPPING
  //maps all candidate
  mapping(uint256 => Item) allItems;

  //maps address of all stakeholder that vote
  mapping(address => bool) allVoters;

  //maps for every  name
  mapping(string => bool) itemNames;

  //MODIFIERS

  //checks for who can vote
  //user can only vote once
  //Voting must be enabled
  modifier canVote(address user) {
    require(allVoters[user] == false, "You can vote only once");
    require(itemCount > 0, "No candidate added");
    require(status == VotingStatus.ongoing, "Voting has not started or voting has closed");
    _;
  }

  modifier timeCheck() {
    require(time > block.timestamp, "Voting time is over");
    _;
  }

  //which candidate is eligible
  modifier eligibleCandidate(string memory _name) {
    //a name can only be registered once
    require(!itemNames[_name], "Name already exists");
    _;
  }

  //addCandidate function
  //only the chairman can add a candidate
  function addItem(string memory _name, string memory _imgUrl) external eligibleCandidate(_name) {
    //create a new struct candidate
    //mapping the candidatecount as ID to the dandidate data
    allItems[itemCount] = Item(itemCount, _name, 0, _imgUrl);
    //increment the count each time a candidate is added
    itemCount++;

    //sets users added
    itemNames[_name] = true;

    //event
    emit Additem(_name);
  }

  function setVotingAccess(string memory _name) public {
    votingAccess = _name;
  }

  function getVotingAccess() public view returns (string memory) {
    return votingAccess;
  }

  //Voting function
  //takes the candidate of choices ID as argument
  function vote(uint256 _itemID, address user) external canVote(user) timeCheck returns (bool) {
    //increment the candidates vote by 1
    allItems[_itemID].vote = allItems[_itemID].vote + 1;

    //mark the voter as having voted
    allVoters[user] = true;

    //emit the event
    emit Voted(_itemID);
    return true;
  }

  //get all candidate
  function getAllItems() external view returns (Item[] memory) {
    Item[] memory all = new Item[](itemCount);

    //iterate all the candidates
    //assign to the array at an index of their ID
    for (uint256 i = 0; i < itemCount; i++) {
      Item storage candi = allItems[i];

      all[i] = candi;
    }
    // return the arrays
    return all;
  }

  //enable voting function
  function enableVoting() public {
    status = VotingStatus.ongoing;
  }

  //allowing for compile result
  function setTime(uint t) public {
    time = t;
  }

  //allowing for compile result
  function setOwner(address addr) public {
    owner = addr;
  }

  function getEndStatus() public view returns (VotingStatus) {
    if (time > block.timestamp) {
      return VotingStatus.ongoing;
    } else {
      return VotingStatus.ended;
    }
  }
}
