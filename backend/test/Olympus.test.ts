/* eslint-disable no-unused-expressions */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { constants } from "ethers";
import { ethers } from "hardhat";
import {
  Drachma,
  Drachma__factory as DrachmaFactory,
  Olympus,
  Olympus__factory as OlympusFactory,
} from "../typechain-types";
import { checkSigner } from "./helper";

chai.use(solidity);

describe("Olympus Contract", function () {
  // const FIRST_NFT_ID = 0;
  // const SECOND_NFT_ID = 1;
  const PRICE = ethers.utils.parseEther("300");
  let drachmaContract: Drachma;
  let olympusContract: Olympus;
  let creator: SignerWithAddress;
  // let player: SignerWithAddress;

  before(async function () {
    const [firstSigner] = await ethers.getSigners();
    creator = checkSigner(firstSigner);
    // player = checkSigner(secondSigner);
    // Drachma Contract
    const DrachmaContract = new DrachmaFactory(creator);
    drachmaContract = await DrachmaContract.deploy();
    await drachmaContract.deployed();
    // Olympus Contract
    const OlympusContract = new OlympusFactory(creator);
    olympusContract = await OlympusContract.deploy(drachmaContract.address);
    await olympusContract.deployed();
  });

  describe("openLootBox", function () {
    it("should revert if attempting to mint to 0x0 address", async function () {
      await expect(olympusContract.openLootBox(constants.AddressZero)).to.be.revertedWith(
        "[Olypmus]: Invalid address"
      );
    });

    it("should revert if address has insufficient funds", async function () {
      await expect(olympusContract.openLootBox(creator.address)).to.be.revertedWith(
        "ERC20: insufficient allowance"
      );
    });

    it("successfully open a lootbox", async function () {
      await drachmaContract.mint(creator.address, PRICE);
      await drachmaContract.approve(olympusContract.address, PRICE);
      expect(olympusContract.openLootBox(creator.address)).to.be.not.reverted;
    });
  });

  describe("obtainNFT", function () {
    it("should revert if address has insufficient funds", async function () {
      await expect(
        olympusContract.obtainNFT({
          value: ethers.utils.parseEther("0"),
        })
      ).to.be.revertedWith("[Olympus]: Incorrect funds");
    });

    it("successfully obtain an NFT", async function () {
      await expect(
        olympusContract.obtainNFT({
          value: ethers.utils.parseEther("0.01"),
        })
      ).to.emit(olympusContract, "Transfer");
    });
  });
});
