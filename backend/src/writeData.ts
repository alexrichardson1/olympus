import fs from "fs";
import { getStrength, getTrait } from "./controllers/game";
import { getAllLoans } from "./controllers/loans";
import { getNFTMetadataByIds } from "./controllers/metadata";
import { getAllSalesWithinWeek } from "./controllers/sales";
import { LoanI } from "./models/loans";
import { MetaDataI } from "./models/metadata";
import { SaleDataI, SaleI } from "./models/sales";

const dummyLoan: LoanI = { _id: -1 };
const dummySale: SaleI = { tokenId: 0, time: 0, price: 0 };
const dummyMeta: MetaDataI = {
  _id: 0,
  name: "",
  description: "",
  image: "",
  attributes: [],
};

const toLabel = (trait: string): 0 | 1 | 2 => {
  switch (trait) {
    case "rock":
      return 0;
    case "paper":
      return 1;
    case "scissors":
      return 2;
    default:
      throw new Error("Invalid trait");
  }
};

const convertToCSV = (arr: any[]) => {
  return arr
    .map((item) => {
      return Object.values(item).toString();
    })
    .join("\n");
};

const writeToCSV = (arr: any[], filename: string) => {
  const ws = fs.createWriteStream(`${filename}.csv`);
  const data = `${convertToCSV(arr)}\n`;
  ws.write(data);
  ws.end();
};

// write data to data.csv
const writeSellData = async () => {
  const sales = await getAllSalesWithinWeek();
  const ids = sales.map((sale) => sale.tokenId);
  const metas = await getNFTMetadataByIds(ids);

  const data: SaleDataI[] = [];

  for (let i = 0; i < sales.length; i++) {
    const sale = sales[i] || dummySale;
    const meta = metas[i] || dummyMeta;
    const trait = getTrait(meta?.attributes);
    const strength = getStrength(meta?.attributes);
    data[i] = {
      time: sale.time,
      trait: toLabel(trait),
      strength: strength,
      prediction: sale.price,
    };
  }
  writeToCSV(data, "data");
};

interface PriceFeedI {
  tokenId: number;
  price: number;
}

// write prediction data to prices.csv
const writeTokenIds = async () => {
  const loans = await getAllLoans();
  // const ids = loans.map((loan) => loan._id);
  const data: PriceFeedI[] = [];
  for (let i = 0; i < loans.length; i++) {
    const loan = loans[i] || dummyLoan;
    data[i] = { tokenId: loan._id, price: 0 };
  }
  writeToCSV(data, "prices");
};

writeSellData();
writeTokenIds();
