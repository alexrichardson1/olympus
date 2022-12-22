import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { Drachma, Drachma__factory as DrachmaFactory } from "../typechain-types";
import { checkSigner } from "./helper";

chai.use(solidity);

describe("Drachma Contract", function () {
  const AMOUNT = 10;
  let drachmaContract: Drachma;
  let deployer: SignerWithAddress;
  let notMinter: SignerWithAddress;

  before(async function () {
    const [firstSigner, secondSigner] = await ethers.getSigners();
    deployer = checkSigner(firstSigner);
    notMinter = checkSigner(secondSigner);
    // Drachma Contract
    const DrachmaContract = new DrachmaFactory(deployer);
    drachmaContract = await DrachmaContract.deploy();
    await drachmaContract.deployed();
  });

  describe("mint", function () {
    it("shouldn't allow an address without the MINTER_ROLE to mint", async function () {
      await expect(drachmaContract.connect(notMinter).mint(deployer.address, AMOUNT)).to.be
        .reverted;
    });

    it("should only allow an address with the MINTER_ROLE to mint", async function () {
      await expect(drachmaContract.mint(deployer.address, AMOUNT)).to.emit(
        drachmaContract,
        "Transfer"
      );
    });
  });
});
