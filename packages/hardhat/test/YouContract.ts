import { expect } from "chai";
import { ethers } from "hardhat";
import { YourContract, ManageVotingNFT, ManageVoting} from "../typechain-types";

describe("YourContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let yourContract: YourContract;
  let nftContract: ManageVotingNFT;
  let voteContract: ManageVoting;

  before(async () => {
    const [owner] = await ethers.getSigners();
    console.log(owner.address);
    const yourContractFactory = await ethers.getContractFactory("YourContract");
    yourContract = (await yourContractFactory.deploy(owner.address)) as YourContract;
    await yourContract.deployed();

    const nftFactory = await ethers.getContractFactory("ManageVotingNFT");
    nftContract = (await nftFactory.deploy()) as ManageVotingNFT;
    await nftContract.deployed();

    const voteFactory = await ethers.getContractFactory("ManageVoting");
    voteContract = (await voteFactory.deploy(nftContract.address)) as ManageVoting;
    await voteContract.deployed();

  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await yourContract.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn scaffold-eth! :)";

      await yourContract.setGreeting(newGreeting);
      expect(await yourContract.greeting()).to.equal(newGreeting);
    });

    it("Test", async function () {
      const [owner, user1, user2] = await ethers.getSigners();
      //const newGreeting = "Learn scaffold-eth! :)";

      await voteContract.createElection("presidential", "pending");
      await voteContract.addItem("presidential","name1","img1");
      await voteContract.addItem("presidential","name2","img2");
      await voteContract.addItem("presidential","name3","img3");


      //console.log(await voteContract.getAllItems("presidential"));

      //await voteContract.addVotingAccess(user1.address, "presidential");
      //await voteContract.addVotingAccess(user2.address, "presidential");

      await voteContract.addManyVotingAccess([user1.address, user2.address], "presidential");

      await voteContract.enableVoting("presidential", 60);

      await voteContract.connect(user1).vote("presidential",0);
      await voteContract.connect(user2).vote("presidential",0);

      console.log(await voteContract.getAllItems("presidential"));

      console.log(await voteContract.getStatus("presidential"));
      


      
      //await yourContract.setGreeting(newGreeting);
      //expect(await yourContract.greeting()).to.equal(newGreeting);
    });
  });
});
