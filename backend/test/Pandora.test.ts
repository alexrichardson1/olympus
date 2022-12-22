/* eslint-disable no-return-assign */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber, utils } from "ethers";
import { ethers } from "hardhat";
import {
  Drachma,
  Drachma__factory as DrachmaFactory,
  Pandora,
  Pandora__factory as PandoraFactory,
} from "../typechain-types";
import { checkSigner } from "./helper";

chai.use(solidity);

interface RewardsI {
  address: string;
  amount: BigNumber;
  signature?: any;
}

const toSignature = (
  signer: SignerWithAddress,
  address: string,
  amount: BigNumber
): Promise<string> => {
  const messageHash = ethers.utils.solidityKeccak256(["address", "uint256"], [address, amount]);
  const messageHashBinary = ethers.utils.arrayify(messageHash);
  return signer.signMessage(messageHashBinary);
};

describe("Pandora Contract", function () {
  let pandoraContract: Pandora;
  let drachmaContract: Drachma;
  let deployer: SignerWithAddress;
  let player: SignerWithAddress;
  let rewards: [RewardsI, RewardsI];
  const RANDOM_CLAIM_AMOUNT = 100;

  before(async function () {
    const [firstSigner, secondSigner] = await ethers.getSigners();
    deployer = checkSigner(firstSigner);
    player = checkSigner(secondSigner);
    // Drachma Contract
    const DrachmaContract = new DrachmaFactory(deployer);
    drachmaContract = await DrachmaContract.deploy();
    await drachmaContract.deployed();
    // Pandora Contract
    const PandoraContract = new PandoraFactory(deployer);
    pandoraContract = await PandoraContract.deploy(drachmaContract.address);
    await pandoraContract.deployed();
    await drachmaContract.grantRole(utils.id("MINTER_ROLE"), pandoraContract.address);

    rewards = [
      { address: player.address, amount: BigNumber.from(1000) },
      { address: deployer.address, amount: BigNumber.from(5000) },
    ];
    rewards.forEach(
      async (account) =>
        (account.signature = await toSignature(deployer, account.address, account.amount))
    );
  });

  describe("Pausable", function () {
    it("should revert claim() when paused", async function () {
      await pandoraContract.pause();
      await expect(
        pandoraContract.connect(player).claim(rewards[0].amount, rewards[0].signature)
      ).to.revertedWith("Pausable: paused");
    });

    it("should not revert claim() when unpaused", async function () {
      await pandoraContract.unpause();
      const [, playerReward] = rewards;
      await pandoraContract.claim(playerReward.amount, playerReward.signature);
      const claimed = await drachmaContract.balanceOf(playerReward.address);
      expect(claimed).to.be.equal(playerReward.amount);
    });
  });

  describe("Ownable", function () {
    it("owner should be deployer", async function () {
      expect(await pandoraContract.owner()).to.be.equal(deployer.address);
    });

    it("only owner can call pause", async function () {
      await expect(pandoraContract.connect(player).pause()).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("only owner can call unpause", async function () {
      await expect(pandoraContract.connect(player).unpause()).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("Claim", function () {
    it("should revert if signature length is invalid", async function () {
      await expect(pandoraContract.claim(RANDOM_CLAIM_AMOUNT, "0x00")).to.revertedWith(
        "ECDSA: invalid signature length"
      );
    });

    it("should revert if different signer", async function () {
      const amount = BigNumber.from(RANDOM_CLAIM_AMOUNT);
      const signature = await toSignature(player, player.address, amount);
      await expect(pandoraContract.connect(player).claim(amount, signature)).to.revertedWith(
        "[Pandora]: Invalid signer or amount"
      );
    });

    it("should revert if different amount", async function () {
      const [playerReward] = rewards;
      const amount = playerReward.amount.add(10);
      await expect(
        pandoraContract.connect(player).claim(amount, playerReward.signature)
      ).to.revertedWith("[Pandora]: Invalid signer or amount");
    });

    it("should revert if different claimer", async function () {
      const [playerReward] = rewards;
      await expect(
        pandoraContract.connect(deployer).claim(playerReward.amount, playerReward.signature)
      ).to.revertedWith("[Pandora]: Invalid signer or amount");
    });

    it("correct claim should be successful", async function () {
      const [playerReward] = rewards;
      const balanceBefore = await drachmaContract.balanceOf(playerReward.address);
      await expect(
        pandoraContract.connect(player).claim(playerReward.amount, playerReward.signature)
      ).to.emit(pandoraContract, "Claimed");
      const expectedBalance = balanceBefore.add(playerReward.amount);
      expect(await drachmaContract.balanceOf(playerReward.address)).equal(expectedBalance);
    });

    it("double claim should be unsuccessful", async function () {
      const [playerReward] = rewards;
      await expect(
        pandoraContract.connect(player).claim(playerReward.amount, playerReward.signature)
      ).to.revertedWith("[Pandora]: Already claimed");
    });

    it("subsequent claims with new signature should be successful", async function () {
      const [playerReward] = rewards;
      const NEW_REWARD_AMOUNT = 8000;
      const newRewards = BigNumber.from(NEW_REWARD_AMOUNT).add(playerReward.amount);
      const signature = await toSignature(deployer, playerReward.address, newRewards);
      await expect(pandoraContract.connect(player).claim(newRewards, signature)).to.emit(
        pandoraContract,
        "Claimed"
      );
      expect(await drachmaContract.balanceOf(playerReward.address)).to.be.equal(newRewards);
    });
  });
});
