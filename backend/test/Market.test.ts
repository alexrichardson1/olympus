/* eslint-disable max-lines-per-function */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import {
  Drachma,
  Drachma__factory as DrachmaFactory,
  Market,
  Market__factory as MarketFactory,
  Olympus,
  Olympus__factory as OlympusFactory,
} from "../typechain-types";
import { checkSigner } from "./helper";

chai.use(solidity);

describe("Market Contract", function () {
  const FIRST_NFT_ID = 0;
  const SECOND_NFT_ID = 1;
  const PRICE = ethers.utils.parseEther("300");
  let marketContract: Market;
  let drachmaContract: Drachma;
  let olympusContract: Olympus;
  let seller: SignerWithAddress;
  let buyer: SignerWithAddress;

  before(async function () {
    const [firstSigner, secondSigner] = await ethers.getSigners();
    seller = checkSigner(firstSigner);
    buyer = checkSigner(secondSigner);
    // Drachma Contract
    const DrachmaContract = new DrachmaFactory(seller);
    drachmaContract = await DrachmaContract.deploy();
    await drachmaContract.deployed();
    // Olympus Contract
    const OlympusContract = new OlympusFactory(seller);
    olympusContract = await OlympusContract.deploy(drachmaContract.address);
    await olympusContract.deployed();
    // Market Contract
    const MarketContract = new MarketFactory(seller);
    marketContract = await MarketContract.deploy(drachmaContract.address, olympusContract.address);
    await marketContract.deployed();
    await drachmaContract.mint(seller.address, PRICE.mul(2));
    await drachmaContract.approve(olympusContract.address, PRICE.mul(2));
    await olympusContract.openLootBox(seller.address);
    await olympusContract.openLootBox(seller.address);
  });

  describe("Pausable", function () {
    it("should revert critical functions when paused", async function () {
      await marketContract.pause();
      await expect(marketContract.addListing(FIRST_NFT_ID, PRICE)).to.revertedWith(
        "Pausable: paused"
      );
      await expect(marketContract.changeSellingPrice(FIRST_NFT_ID, PRICE)).to.revertedWith(
        "Pausable: paused"
      );
      await expect(marketContract.buy(FIRST_NFT_ID)).to.revertedWith("Pausable: paused");
      await expect(marketContract.withdraw()).to.revertedWith("Pausable: paused");
    });

    it("should revert `emergencyWithdraw` when unpaused", async function () {
      await marketContract.unpause();
      await expect(marketContract.emergencyWithdraw(FIRST_NFT_ID)).to.revertedWith(
        "Pausable: not paused"
      );
    });
  });

  describe("Ownable", function () {
    it("owner should be deployer", async function () {
      expect(await marketContract.owner()).to.be.equal(seller.address);
    });

    it("only owner can call pause", async function () {
      await expect(marketContract.connect(buyer).pause()).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("only owner can call unpause", async function () {
      await expect(marketContract.connect(buyer).unpause()).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("only owner can call withdraw", async function () {
      await expect(marketContract.connect(buyer).emergencyWithdraw(FIRST_NFT_ID)).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("addListing", function () {
    it("should successfully add a listing", async function () {
      await olympusContract.approve(marketContract.address, FIRST_NFT_ID);
      await expect(marketContract.addListing(FIRST_NFT_ID, PRICE)).to.emit(
        marketContract,
        "AddListing"
      );
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(marketContract.address);
    });

    it("should revert if not the owner of the NFT", async function () {
      await expect(marketContract.addListing(FIRST_NFT_ID, PRICE)).to.be.revertedWith(
        "[Market]: You are not the owner of this NFT"
      );
    });
  });

  describe("changeSellingPrice", function () {
    it("should revert if not the seller of the NFT", async function () {
      await expect(
        marketContract.connect(buyer).changeSellingPrice(FIRST_NFT_ID, PRICE)
      ).to.be.revertedWith("[Market]: You are not the seller of this NFT");
    });

    it("should successfully allow the changing of a price", async function () {
      const NEW_PRICE = 200;
      await marketContract.changeSellingPrice(FIRST_NFT_ID, NEW_PRICE);
      const listing = await marketContract.listings(FIRST_NFT_ID);
      expect(listing[1]).equal(NEW_PRICE);
      // change price back for following tests
      await marketContract.changeSellingPrice(FIRST_NFT_ID, PRICE);
      const updatedListing = await marketContract.listings(FIRST_NFT_ID);
      expect(updatedListing[1]).equal(PRICE);
    });
  });

  describe("removeListing", function () {
    it("should revert if not the seller", function () {
      expect(marketContract.connect(buyer).removeListing(FIRST_NFT_ID)).to.be.revertedWith(
        "[Market]: You are not the seller of this NFT"
      );
    });

    it("should successfully remove a listing", async function () {
      await olympusContract.approve(marketContract.address, SECOND_NFT_ID);
      await marketContract.addListing(SECOND_NFT_ID, PRICE);
      expect(await olympusContract.ownerOf(SECOND_NFT_ID)).equal(marketContract.address);
      await expect(marketContract.removeListing(SECOND_NFT_ID)).to.emit(
        marketContract,
        "RemoveListing"
      );
      expect(await olympusContract.ownerOf(SECOND_NFT_ID)).equal(seller.address);
    });
  });

  describe("buy", function () {
    it("should revert if NFT not for sale", async function () {
      await expect(marketContract.buy(SECOND_NFT_ID)).to.be.revertedWith(
        "[Market]: This NFT is not for sale"
      );
    });

    it("should revert if the buyer is the seller", async function () {
      await expect(marketContract.buy(FIRST_NFT_ID)).to.be.revertedWith(
        "[Market]: You cannot buy your own NFT"
      );
    });

    it("should revert if the buyer has insufficient funds", async function () {
      await drachmaContract.connect(buyer).approve(marketContract.address, PRICE);
      expect(marketContract.connect(buyer).buy(FIRST_NFT_ID)).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance"
      );
    });

    it("should allow a buyer to buy an NFT", async function () {
      await drachmaContract.connect(buyer).approve(marketContract.address, PRICE);
      await drachmaContract.mint(buyer.address, PRICE);
      await expect(marketContract.connect(buyer).buy(FIRST_NFT_ID)).to.emit(marketContract, "Buy");
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(buyer.address);
      expect(await marketContract.balances(seller.address)).equal(PRICE);
    });
  });

  describe("Withdraw", function () {
    it("sucessful withdraw", async function () {
      const balanceAvailable = await marketContract.balances(seller.address);
      const balanceBefore = await drachmaContract.balanceOf(seller.address);
      await marketContract.withdraw();
      expect(await drachmaContract.balanceOf(seller.address)).equal(
        balanceBefore.add(balanceAvailable)
      );
    });
  });

  describe("emergencyWithdraw should return NFT to seller", function () {
    it("should return NFT to seller", async function () {
      await olympusContract.approve(marketContract.address, SECOND_NFT_ID);
      await marketContract.addListing(SECOND_NFT_ID, PRICE);
      await marketContract.pause();
      await marketContract.emergencyWithdraw(SECOND_NFT_ID);
      expect(await olympusContract.ownerOf(SECOND_NFT_ID)).equal(seller.address);
    });
  });
});
