/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import {
  Drachma,
  Drachma__factory as DrachmaFactory,
  Hermes,
  Hermes__factory as HermesFactory,
  Olympus,
  Olympus__factory as OlympusFactory,
} from "../typechain-types";
import { checkSigner } from "./helper";

chai.use(solidity);

describe("Hermes Contract", function () {
  const FIRST_NFT_ID = 0;
  const SECOND_NFT_ID = 1;
  const PRICE = ethers.utils.parseEther("300");
  const ONE_DAY = 86400;
  const ONE_YEAR = 31622400;
  const DURATION = BigNumber.from(10).mul(ONE_DAY);
  const LENDER_INTEREST = PRICE.mul(30)
    .mul(DURATION)
    .div(100 * 2 * ONE_YEAR);
  const COLLATERAL = PRICE.add(LENDER_INTEREST.mul(2));

  let hermesContract: Hermes;
  let drachmaContract: Drachma;
  let olympusContract: Olympus;
  let lender: SignerWithAddress;
  let borrower: SignerWithAddress;

  before(async function () {
    const [firstSigner, secondSigner] = await ethers.getSigners();
    lender = checkSigner(firstSigner);
    borrower = checkSigner(secondSigner);
    // Drachma Contract
    const DrachmaContract = new DrachmaFactory(lender);
    drachmaContract = await DrachmaContract.deploy();
    await drachmaContract.deployed();
    // Olympus Contract
    const OlympusContract = new OlympusFactory(lender);
    olympusContract = await OlympusContract.deploy(drachmaContract.address);
    await olympusContract.deployed();
    // Hermes Contract
    const HermesContract = new HermesFactory(lender);
    hermesContract = await HermesContract.deploy(drachmaContract.address, olympusContract.address);
    await hermesContract.deployed();
    await drachmaContract.mint(lender.address, PRICE.mul(2));
    await drachmaContract.approve(olympusContract.address, PRICE.mul(2));
    await olympusContract.openLootBox(lender.address);
    await olympusContract.openLootBox(lender.address);
  });

  describe("Pausable", function () {
    it("should revert critical functions when paused", async function () {
      await hermesContract.pause();
      await expect(hermesContract.addListing(FIRST_NFT_ID, PRICE, DURATION)).to.revertedWith(
        "Pausable: paused"
      );
      await expect(hermesContract.removeListing(FIRST_NFT_ID)).to.revertedWith("Pausable: paused");
      await expect(hermesContract.borrow(FIRST_NFT_ID)).to.revertedWith("Pausable: paused");
      await expect(hermesContract.liquidate(PRICE)).to.revertedWith("Pausable: paused");
      await expect(hermesContract.claim(PRICE)).to.revertedWith("Pausable: paused");
    });

    it("should revert `emergencyWithdraw` when unpaused", async function () {
      await hermesContract.unpause();
      await expect(hermesContract.emergencyWithdraw(FIRST_NFT_ID)).to.revertedWith(
        "Pausable: not paused"
      );
    });
  });

  describe("Ownable", function () {
    it("owner should be deployer", async function () {
      expect(await hermesContract.owner()).to.be.equal(lender.address);
    });

    it("only owner can call pause", async function () {
      await expect(hermesContract.connect(borrower).pause()).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("only owner can call unpause", async function () {
      await expect(hermesContract.connect(borrower).unpause()).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("only owner can call emergency withdraw", async function () {
      await expect(
        hermesContract.connect(borrower).emergencyWithdraw(FIRST_NFT_ID)
      ).to.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("addListing", function () {
    it("should successfully add a listing", async function () {
      await olympusContract.approve(hermesContract.address, FIRST_NFT_ID);
      await expect(hermesContract.addListing(FIRST_NFT_ID, PRICE, DURATION)).to.emit(
        hermesContract,
        "AddListing"
      );
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(hermesContract.address);
    });

    it("should revert if price is 0", async function () {
      await expect(hermesContract.addListing(FIRST_NFT_ID, 0, DURATION)).to.be.revertedWith(
        "[Hermes]: Invalid price"
      );
    });

    it("should revert if duration is 0", async function () {
      await expect(hermesContract.addListing(FIRST_NFT_ID, PRICE, 0)).to.be.revertedWith(
        "[Hermes]: Invalid duration"
      );
    });

    it("should revert if not the owner of the NFT", async function () {
      await expect(hermesContract.addListing(FIRST_NFT_ID, PRICE, DURATION)).to.be.revertedWith(
        "[Hermes]: You are not the owner of the NFT"
      );
    });

    it("should revert if already has a listing", async function () {
      await expect(hermesContract.addListing(SECOND_NFT_ID, PRICE, DURATION)).to.be.revertedWith(
        "[Hermes]: Can only list one NFT at a time"
      );
    });
  });

  describe("removeListing", function () {
    it("should revert if not the lender", async function () {
      await expect(hermesContract.connect(borrower).removeListing(FIRST_NFT_ID)).to.be.revertedWith(
        "[Hermes]: You are not the lender of this NFT"
      );
    });

    it("should successfully remove a listing", async function () {
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(hermesContract.address);
      await expect(hermesContract.removeListing(FIRST_NFT_ID)).to.emit(
        hermesContract,
        "RemoveListing"
      );
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(lender.address);
    });
  });

  describe("borrow", function () {
    it("should revert if not an available NFT to borrow", async function () {
      await expect(hermesContract.connect(borrower).borrow(SECOND_NFT_ID)).to.be.revertedWith(
        "[Hermes]: Invalid token id"
      );
    });

    it("should revert if Drachma not available", async function () {
      await olympusContract.approve(hermesContract.address, FIRST_NFT_ID);
      await hermesContract.addListing(FIRST_NFT_ID, PRICE, DURATION);
      expect(hermesContract.connect(borrower).borrow(FIRST_NFT_ID)).to.be.revertedWith(
        "ERC20: insufficient allowance"
      );
    });

    it("should successfully allow a borrower to borrow a NFT", async function () {
      await drachmaContract.mint(borrower.address, COLLATERAL);
      await drachmaContract.connect(borrower).approve(hermesContract.address, COLLATERAL);
      await expect(hermesContract.connect(borrower).borrow(FIRST_NFT_ID)).to.emit(
        hermesContract,
        "Borrow"
      );
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(borrower.address);
    });
  });

  describe("payoff", function () {
    it("should revert if not the lender", async function () {
      await expect(hermesContract.payoff(FIRST_NFT_ID)).to.be.revertedWith(
        "[Hermes]: You are not the borrower of this NFT"
      );
    });

    it("should successfully handle the payoff", async function () {
      await olympusContract.connect(borrower).approve(hermesContract.address, FIRST_NFT_ID);
      await ethers.provider.send("evm_increaseTime", [DURATION.toNumber() - 20]);
      await ethers.provider.send("evm_mine", []);
      const balance = await drachmaContract.balanceOf(borrower.address);
      await hermesContract.connect(borrower).payoff(FIRST_NFT_ID);
      const expectedBalance = balance.add(PRICE);
      expect(await drachmaContract.balanceOf(borrower.address)).equal(expectedBalance);
    });
  });

  describe("claim", function () {
    it("should revert if not the lender", async function () {
      await expect(hermesContract.connect(borrower).claim(FIRST_NFT_ID)).to.be.revertedWith(
        "[Hermes]: You are not the lender of this NFT"
      );
    });

    it("should successfully allow the lender claim NFT & interest after loan", async function () {
      const balanceBefore = await drachmaContract.balanceOf(lender.address);
      await ethers.provider.send("evm_increaseTime", [DURATION.toNumber()]);
      await ethers.provider.send("evm_mine", []);
      await expect(hermesContract.claim(FIRST_NFT_ID)).to.emit(hermesContract, "RemoveLoan");
      const expectedBalance = balanceBefore.add(LENDER_INTEREST);
      const balance = await drachmaContract.balanceOf(lender.address);
      expect(balance.sub(10) < balance && balance <= expectedBalance).to.be.true;
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(lender.address);
    });
  });

  describe("Early payoff", function () {
    it("should allow buyers to payoff early", async function () {
      // add listing
      await olympusContract.approve(hermesContract.address, SECOND_NFT_ID);
      await hermesContract.addListing(SECOND_NFT_ID, PRICE, DURATION);
      // borrow
      await drachmaContract.mint(borrower.address, COLLATERAL);
      await drachmaContract.connect(borrower).approve(hermesContract.address, COLLATERAL);
      await hermesContract.connect(borrower).borrow(SECOND_NFT_ID);
      // payoff
      await ethers.provider.send("evm_increaseTime", [DURATION.toNumber() / 2]);
      await ethers.provider.send("evm_mine", []);
      await olympusContract.connect(borrower).approve(hermesContract.address, SECOND_NFT_ID);
      const balance = await drachmaContract.balanceOf(borrower.address);
      await hermesContract.connect(borrower).payoff(SECOND_NFT_ID);
      const expectedBalance = balance.add(PRICE);
      expect(await drachmaContract.balanceOf(borrower.address)).equal(expectedBalance);
    });

    it("should allow lender to claim early payoff loan", async function () {
      const balanceBefore = await drachmaContract.balanceOf(lender.address);
      await ethers.provider.send("evm_increaseTime", [DURATION.toNumber()]);
      await ethers.provider.send("evm_mine", []);
      await hermesContract.claim(SECOND_NFT_ID);
      const expectedBalance = balanceBefore.add(LENDER_INTEREST);
      const balance = await drachmaContract.balanceOf(lender.address);
      expect(
        expectedBalance.sub(ethers.utils.parseEther("10")) < balance && balance <= expectedBalance
      ).to.be.true;
      expect(await olympusContract.ownerOf(SECOND_NFT_ID)).equal(lender.address);
    });
  });

  describe("liquidate", function () {
    it("should revert if not the lender", async function () {
      await olympusContract.approve(hermesContract.address, SECOND_NFT_ID);
      await hermesContract.addListing(SECOND_NFT_ID, PRICE, DURATION);
      await drachmaContract.mint(borrower.address, COLLATERAL);
      await drachmaContract.connect(borrower).approve(hermesContract.address, COLLATERAL);
      await hermesContract.connect(borrower).borrow(SECOND_NFT_ID);
      expect(hermesContract.connect(borrower).liquidate(SECOND_NFT_ID)).to.be.revertedWith(
        "[Hermes]: You are not the lender of this NFT"
      );
    });

    it("should only liquidate on correct conditions", async function () {
      const balanceBefore = await drachmaContract.balanceOf(lender.address);
      await hermesContract.connect(lender).liquidate(SECOND_NFT_ID);
      expect(await drachmaContract.balanceOf(lender.address)).equal(balanceBefore);
    });

    it("should liquidate if gone past loan end date", async function () {
      await ethers.provider.send("evm_increaseTime", [DURATION.toNumber()]);
      await ethers.provider.send("evm_mine", []);
      const balanceBefore = await drachmaContract.balanceOf(lender.address);
      const expectedBalance = balanceBefore.add(COLLATERAL);
      await expect(hermesContract.connect(lender).liquidate(SECOND_NFT_ID)).to.emit(
        hermesContract,
        "Liquidate"
      );
      expect(await drachmaContract.balanceOf(lender.address)).equal(expectedBalance);
    });
  });

  describe("emergencyWithdraw should return NFT to lender", function () {
    it("should success", async function () {
      await olympusContract.approve(hermesContract.address, FIRST_NFT_ID);
      await hermesContract.addListing(FIRST_NFT_ID, PRICE, DURATION);
      await hermesContract.pause();
      await hermesContract.emergencyWithdraw(FIRST_NFT_ID);
      expect(await olympusContract.ownerOf(FIRST_NFT_ID)).equal(lender.address);
      hermesContract.unpause();
    });
  });

  describe("Update Prices", function () {
    it("update", async function () {
      await olympusContract.approve(hermesContract.address, FIRST_NFT_ID);
      await hermesContract.addListing(FIRST_NFT_ID, PRICE, DURATION);
      await drachmaContract.mint(borrower.address, COLLATERAL);
      await drachmaContract.connect(borrower).approve(hermesContract.address, COLLATERAL);
      await expect(hermesContract.connect(borrower).borrow(FIRST_NFT_ID)).to.emit(
        hermesContract,
        "Borrow"
      );
      await hermesContract.updatePrices([FIRST_NFT_ID], [PRICE.add(2)]);
      const loan = await hermesContract.loans(FIRST_NFT_ID);
      const { price } = loan;
      expect(price).equal(PRICE.add(2));
    });
  });
});
