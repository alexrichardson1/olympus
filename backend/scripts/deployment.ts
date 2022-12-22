/* eslint-disable new-cap */
/* eslint-disable no-magic-numbers */
import { BigNumber, utils } from "ethers";
import { ethers } from "hardhat";
import mongoDB from "../src/controllers/database";
import { batchGenerate } from "../src/generateImages";
import { Addresses } from "../src/models/addresses";
import {
  Drachma__factory as DrachmaFactory,
  Game__factory as GameFactory,
  Gold__factory as GoldFactory,
  Hermes__factory as HermesFactory,
  Market__factory as MarketFactory,
  Olympus__factory as OlympusFactory,
  Pandora__factory as PandoraFactory,
  Plutus__factory as PlutusFactory,
  Zeus__factory as ZeusFactory,
} from "../typechain-types";

const ONE_YEAR_IN_SECONDS = 31557600;
const FIVE_YEARS_IN_SECONDS = ONE_YEAR_IN_SECONDS * 5;

const fiveYearsFromNow = () => {
  const time = Date.now().toFixed();
  return BigNumber.from(time).div(1000).add(FIVE_YEARS_IN_SECONDS);
};

const upload = async (addresses: string[]): Promise<void> => {
  await mongoDB.connect();
  // remove previous contracts
  await Addresses.deleteMany();
  const query = new Addresses({ addresses });
  console.log(addresses);
  console.log(query);
  await query.save();
};

const deploy = async () => {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error("Deployer is undefined");
  }
  // Drachma Contract
  const DrachmaContract = new DrachmaFactory(deployer);
  const drachmaContract = await DrachmaContract.deploy();
  await drachmaContract.deployed();
  console.log(`Drachma contract deployed at ${drachmaContract.address}`);
  // Olympus Contract
  const OlympusContract = new OlympusFactory(deployer);
  const olympusContract = await OlympusContract.deploy(drachmaContract.address);
  await olympusContract.deployed();
  console.log(`Olympus contract deployed at ${olympusContract.address}`);
  // Market Contract
  const MarketContract = new MarketFactory(deployer);
  const marketContract = await MarketContract.deploy(
    drachmaContract.address,
    olympusContract.address
  );
  await marketContract.deployed();
  console.log(`Market contract deployed at ${marketContract.address}`);
  // Hermes Contract
  const HermesContract = new HermesFactory(deployer);
  const hermesContract = await HermesContract.deploy(
    drachmaContract.address,
    olympusContract.address
  );
  await hermesContract.deployed();
  console.log(`Hermes contract deployed at ${hermesContract.address}`);
  // Plutus Contract
  const PlutusContract = new PlutusFactory(deployer);
  const plutusContract = await PlutusContract.deploy(
    marketContract.address,
    fiveYearsFromNow(),
    ONE_YEAR_IN_SECONDS
  );
  await plutusContract.deployed();
  console.log(`Plutus contract deployed at ${plutusContract.address}`);
  // Gold Contract
  const GoldContract = new GoldFactory(deployer);
  const goldContract = await GoldContract.deploy(plutusContract.address);
  await goldContract.deployed();
  console.log(`Gold contract deployed at ${goldContract.address}`);
  // Game Contract
  const GameContract = new GameFactory(deployer);
  const gameContract = await GameContract.deploy(olympusContract.address);
  await gameContract.deployed();
  console.log(`Game contract deployed at ${gameContract.address}`);
  // Zeus Contract
  const ZeusContract = new ZeusFactory(deployer);
  const zeusContract = await ZeusContract.deploy(goldContract.address);
  await zeusContract.deployed();
  console.log(`Zeus contract deployed at ${zeusContract.address}`);
  // Pandora Contract
  const PandoraContract = new PandoraFactory(deployer);
  const pandoraContract = await PandoraContract.deploy(drachmaContract.address);
  await pandoraContract.deployed();
  await drachmaContract.grantRole(utils.id("MINTER_ROLE"), pandoraContract.address);
  console.log(`Pandora contract deployed at ${pandoraContract.address}`);

  // generate first 100 images
  await batchGenerate();
  const PRICE = await olympusContract.PRICE();
  // mint NFTs for the Game contract
  await drachmaContract.mint(deployer.address, PRICE.mul(10));
  await drachmaContract.approve(olympusContract.address, PRICE.mul(10));
  for (let i = 0; i < 10; i++) {
    await olympusContract.openLootBox(gameContract.address);
  }
  await upload([
    drachmaContract.address,
    olympusContract.address,
    marketContract.address,
    hermesContract.address,
    plutusContract.address,
    goldContract.address,
    gameContract.address,
    zeusContract.address,
    pandoraContract.address,
  ]);
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
