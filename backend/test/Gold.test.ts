import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import {
  Gold,
  Gold__factory as GoldFactory,
  Plutus,
  Plutus__factory as PlutusFactory,
} from "../typechain-types";
import { checkSigner } from "./helper";

chai.use(solidity);

describe("Gold Contract", function () {
  // 2 years in seconds
  const VESTING_DURAITON = 63115200;
  const TOTAL_SUPPLY = ethers.utils.parseEther("10000");
  let plutusContract: Plutus;
  let goldContract: Gold;
  let deployer: SignerWithAddress;
  // let voterOne: SignerWithAddress;

  before(async function () {
    const [firstSigner] = await ethers.getSigners();
    deployer = checkSigner(firstSigner);
    // voterOne = checkSigner(secondSigner);
    // Plutus Contract
    const PlutusContract = new PlutusFactory(deployer);
    plutusContract = await PlutusContract.deploy(deployer.address, Date.now(), VESTING_DURAITON);
    await plutusContract.deployed();
    // Gold Contract
    const GoldContract = new GoldFactory(deployer);
    goldContract = await GoldContract.deploy(plutusContract.address);
    await goldContract.deployed();
  });

  describe("Total Supply", function () {
    it("total supply should be 10000 ether", async function () {
      expect(await goldContract.totalSupply()).equal(TOTAL_SUPPLY);
    });
  });

  describe("Symbol Name", function () {
    it("symbol name should be GLD", async function () {
      expect(await goldContract.symbol()).equal("GLD");
    });
  });
});
