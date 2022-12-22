import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import {
  Gold,
  Gold__factory as GoldFactory,
  Plutus,
  Plutus__factory as PlutusFactory,
  Zeus,
  Zeus__factory as ZeusFactory,
} from "../typechain-types";
import { checkSigner } from "./helper";

chai.use(solidity);

describe("Zeus Contract", function () {
  // 2 years in seconds
  const VESTING_DURAITON = 63115200;
  let plutusContract: Plutus;
  let goldContract: Gold;
  let zeusContract: Zeus;
  let deployer: SignerWithAddress;

  before(async function () {
    const [firstSigner] = await ethers.getSigners();
    deployer = checkSigner(firstSigner);
    // Plutus Contract
    const PlutusContract = new PlutusFactory(deployer);
    plutusContract = await PlutusContract.deploy(deployer.address, Date.now(), VESTING_DURAITON);
    await plutusContract.deployed();
    // Gold Contract
    const GoldContract = new GoldFactory(deployer);
    goldContract = await GoldContract.deploy(plutusContract.address);
    await goldContract.deployed();
    // Zeus Contract
    const ZeusContract = new ZeusFactory(deployer);
    zeusContract = await ZeusContract.deploy(goldContract.address);
    await zeusContract.deployed();
  });

  describe("Name", function () {
    it("name should be Zeus", async function () {
      expect(await zeusContract.name()).equal("Zeus");
    });
  });
});
