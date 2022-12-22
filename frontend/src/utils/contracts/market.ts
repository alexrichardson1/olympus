import { Provider } from "@ethersproject/providers";
import { BigNumber, utils } from "ethers";
import { getRPCProvider } from "utils/connectors";
import { isZeroAddress } from "utils/helpers";
import { Market__factory as MarketFactory } from "../../typechain-types/factories/contracts/Market__factory";
import { approveDrachmaTransfer } from "./drachma";
import { approveOlympusTransfer } from "./olympus";

const marketContract = (marketAddress: string, provider: Provider) => {
  return MarketFactory.connect(marketAddress, provider);
};

export const handleAddListing = async (
  olypmusAddress: string,
  marketAddress: string,
  library: any,
  tokenId: number,
  price: number
) => {
  try {
    await approveOlympusTransfer(olypmusAddress, marketAddress, library, tokenId);
    const market = marketContract(marketAddress, library.getSigner());
    const tx = await market.addListing(tokenId, utils.parseEther(price.toString()));
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const handleChangeSellingPrice = async (
  marketAddress: string,
  library: any,
  tokenId: number,
  newPrice: number
) => {
  try {
    const market = marketContract(marketAddress, library.getSigner());
    const tx = await market.changeSellingPrice(tokenId, utils.parseEther(newPrice.toString()));
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const handleRemoveListing = async (marketAddress: string, library: any, tokenId: number) => {
  try {
    const market = marketContract(marketAddress, library.getSigner());
    const tx = await market.removeListing(tokenId);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const handleBuy = async (
  drachmaAddress: string,
  marketAddress: string,
  library: any,
  tokenId: number
) => {
  try {
    const market = marketContract(marketAddress, library.getSigner());
    const listing = await market.listings(tokenId);
    await approveDrachmaTransfer(drachmaAddress, marketAddress, library, listing[1]);
    const tx = await market.buy(tokenId);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const handleWithdraw = async (marketAddress: string, library: any) => {
  if (isZeroAddress(marketAddress)) {
    return;
  }
  try {
    console.log(marketAddress);
    const market = marketContract(marketAddress, library.getSigner());
    const tx = await market.withdraw();
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

interface ListingI {
  seller: string;
  price: BigNumber;
}

export const getListing = async (marketAddress: string, tokenId: number): Promise<ListingI> => {
  if (isZeroAddress(marketAddress)) {
    return { seller: "0x0", price: BigNumber.from(0) };
  }
  const market = marketContract(marketAddress, getRPCProvider());
  const listing = await market.listings(tokenId);
  return listing;
};
