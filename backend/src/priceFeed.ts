import { getAllAddresses } from "controllers/addresses";
import { ethers } from "ethers";
import csv from "fast-csv";
import fs from "fs";
import { ContractIndex } from "models/addresses";
import { Hermes__factory as HermesFactory } from "../typechain-types";
import { getRPCProvider } from "./controllers/common";

interface PriceFeedI {
  tokenId: number;
  price: number;
}

const updatePrices = async (tokenIds: number[], prices: number[]) => {
  const res = await getAllAddresses();
  if (!res) {
    return;
  }
  const { addresses } = res;
  const hermesAddress = addresses[ContractIndex.Hermes] || "0x0";
  if (!process.env.DEV_WALLET_PRIVATE_KEY) {
    throw new Error("Private key is undefiend");
  }
  const wallet = new ethers.Wallet(process.env.DEV_WALLET_PRIVATE_KEY, getRPCProvider());
  const hermesContract = HermesFactory.connect(hermesAddress, wallet);
  await hermesContract.updatePrices(tokenIds, prices);
};

const read = () => {
  const data: PriceFeedI[] = [];
  fs.createReadStream("./prices.csv")
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => data.push(row))
    .on("end", async () => {
      const ids = data.map((item) => item.tokenId);
      const prices = data.map((item) => item.price);
      await updatePrices(ids, prices);
    });
};

read();
