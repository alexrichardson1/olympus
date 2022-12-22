import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import {
  Drachma,
  Drachma__factory as DrachmaFactory,
  Game,
  Game__factory as GameFactory,
  Olympus,
  Olympus__factory as OlympusFactory,
} from "../typechain-types";
import { checkSigner } from "./helper";

chai.use(solidity);

describe("Game Contract", function () {
  const FIRST_NFT_ID = 0;
  const PRICE = ethers.utils.parseEther("300");
  let gameContract: Game;
  let drachmaContract: Drachma;
  let olympusContract: Olympus;
  let deployer: SignerWithAddress;
  let other: SignerWithAddress;

  before(async function () {
    const [firstSigner, secondSigner] = await ethers.getSigners();
    deployer = checkSigner(firstSigner);
    other = checkSigner(secondSigner);
    // Drachma Contract
    const DrachmaContract = new DrachmaFactory(deployer);
    drachmaContract = await DrachmaContract.deploy();
    await drachmaContract.deployed();
    // Olympus Contract
    const OlympusContract = new OlympusFactory(deployer);
    olympusContract = await OlympusContract.deploy(drachmaContract.address);
    await olympusContract.deployed();
    // Game Contract
    const GameContract = new GameFactory(deployer);
    gameContract = await GameContract.deploy(olympusContract.address);
    await gameContract.deployed();
    await drachmaContract.mint(deployer.address, PRICE);
  });

  describe("Ownable", function () {
    it("owner should be deployer", async function () {
      expect(await gameContract.owner()).to.be.equal(deployer.address);
    });

    it("only owner can call withdraw", async function () {
      await expect(gameContract.connect(other).withdraw(FIRST_NFT_ID)).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("ERC721Holder", function () {
    it("should successfully receieve Olympus token", async function () {
      await drachmaContract.approve(olympusContract.address, PRICE);
      await expect(olympusContract.openLootBox(gameContract.address)).to.emit(
        olympusContract,
        "Transfer"
      );
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(gameContract.address);
    });
  });

  describe("withdraw", function () {
    it("should be a successful withdrawal", async function () {
      await gameContract.withdraw(FIRST_NFT_ID);
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(deployer.address);
    });
  });
});
