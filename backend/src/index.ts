/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from "cors";
import { BigNumber, constants } from "ethers";
import express from "express";
import {
  Hermes__factory as HermesFactory,
  Market__factory as MarketFactory,
  Olympus__factory as OlympusFactory,
} from "../typechain-types";
import { getAllAddresses } from "./controllers/addresses";
import { getRPCProvider } from "./controllers/common";
import { removeLoan } from "./controllers/loans";
import { batchGenerate } from "./generateImages";
import { ContractIndex } from "./models/addresses";
import { LoanI, Loans } from "./models/loans";
import { SaleI, Sales } from "./models/sales";
import addressesRoutes from "./routes/addresses";
import gameRoutes from "./routes/game";
import metadataRoutes from "./routes/metadata";

const LOCAL_HOST = "http://localhost:3000";
const SUCCESS_STATUS = 200;
const BATCH_SIZE = 100;
const GEN_NUMBER = 95;

const app = express();
// cors
const corsOptions = {
  origin: LOCAL_HOST,
  optionSuccessStatus: SUCCESS_STATUS,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// routes
app.use("/metadata", metadataRoutes);
app.use("/addresses", addressesRoutes);
app.use("/game", gameRoutes);
// default
app.get("/", (_req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

const getContractAddress = async (index: ContractIndex) => {
  const res = await getAllAddresses();
  if (!res) {
    throw Error("No addresses found");
  }
  const { addresses } = res;
  const contractAddress = addresses[index];
  if (!contractAddress) {
    throw Error("Address not found");
  }
  return contractAddress;
};

const addOlympusListener = async () => {
  const olympusAddress = await getContractAddress(ContractIndex.Olympus);
  const olympusContract = OlympusFactory.connect(olympusAddress, getRPCProvider());
  // listen to transfer from "0x0"
  olympusContract.on("Transfer", (from: string, _to: string, tokenId: BigNumber) => {
    if (from === constants.AddressZero && tokenId.mod(BATCH_SIZE).eq(GEN_NUMBER)) {
      batchGenerate();
    }
  });
};

const addMarketListener = async () => {
  const marketAddress = await getContractAddress(ContractIndex.Market);
  const marketContract = MarketFactory.connect(marketAddress, getRPCProvider());

  marketContract.on(
    "Buy",
    (time: BigNumber, price: BigNumber, tokenId: BigNumber, seller: string, buyer: string) => {
      const sale: SaleI = {
        tokenId: tokenId.toNumber(),
        time: time.toNumber(),
        price: price.toNumber(),
      };
      new Sales(sale).save();
    }
  );
};

const addHermesListener = async () => {
  const hermesAddress = await getContractAddress(ContractIndex.Hermes);
  const hermesContract = HermesFactory.connect(hermesAddress, getRPCProvider());

  hermesContract.on("Borrow", (borrower: string, tokenId: BigNumber) => {
    const loan: LoanI = {
      _id: tokenId.toNumber(),
    };
    new Loans(loan).save();
  });

  hermesContract.on("RemoveLoan", (tokenId: BigNumber) => {
    removeLoan(tokenId.toNumber());
  });
};

const addListeners = () => {
  addOlympusListener();
  addMarketListener();
  addHermesListener();
};

addListeners();

export default app;
