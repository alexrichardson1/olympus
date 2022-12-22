import { Provider } from "@ethersproject/providers";
import { BigNumber, utils } from "ethers";
import { getRPCProvider } from "utils/connectors";
import { DAYS_IN_SECONDS } from "utils/constants";
import { isZeroAddress } from "utils/helpers";
import { Hermes__factory as HermesFactory } from "../../typechain-types/factories/contracts/Hermes__factory";
import { approveDrachmaTransfer } from "./drachma";
import { approveOlympusTransfer } from "./olympus";

const hermesContract = (hermesAddress: string, provider: Provider) => {
  return HermesFactory.connect(hermesAddress, provider);
};

export const addListing = async (
  olypmusAddress: string,
  hermesAddress: string,
  library: any,
  tokenId: number,
  price: number,
  duration: number
) => {
  try {
    await approveOlympusTransfer(olypmusAddress, hermesAddress, library, tokenId);
    const hermes = hermesContract(hermesAddress, library.getSigner());
    const tx = await hermes.addListing(tokenId, utils.parseEther(price.toString()), duration);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const removeListing = async (hermesAddress: string, library: any, tokenId: number) => {
  try {
    const hermes = hermesContract(hermesAddress, library.getSigner());
    const tx = await hermes.removeListing(tokenId);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const getCollateral = async (hermesAddress: string, tokenId: number) => {
  if (isZeroAddress(hermesAddress)) {
    return BigNumber.from(0);
  }
  const hermes = hermesContract(hermesAddress, getRPCProvider());
  const listing = await hermes.listings(tokenId);
  const { price, duration } = listing;
  const collateral = price.add(price.mul(BigNumber.from(30 * duration)).div(31622400 * 100));
  return collateral;
};

export const borrow = async (
  drachmaAddress: string,
  hermesAddress: string,
  library: any,
  tokenId: number
) => {
  try {
    const hermes = hermesContract(hermesAddress, library.getSigner());
    const collateral = await getCollateral(hermesAddress, tokenId);
    await approveDrachmaTransfer(drachmaAddress, hermesAddress, library, collateral);
    const tx = await hermes.borrow(tokenId);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const liquidate = async (hermesAddress: string, library: any, tokenId: number) => {
  try {
    const hermes = hermesContract(hermesAddress, library.getSigner());
    const tx = await hermes.liquidate(tokenId);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const claim = async (hermesAddress: string, library: any, tokenId: number) => {
  try {
    const hermes = hermesContract(hermesAddress, library.getSigner());
    const tx = await hermes.claim(tokenId);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const payoff = async (
  olypmusAddress: string,
  hermesAddress: string,
  library: any,
  tokenId: number
) => {
  try {
    await approveOlympusTransfer(olypmusAddress, hermesAddress, library, tokenId);
    const hermes = hermesContract(hermesAddress, library.getSigner());
    const tx = await hermes.payoff(tokenId);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

interface TermI {
  price: BigNumber;
  lender: string;
  borrowerClaimed: boolean;
  borrower: string;
  startTime: number;
  duration: number;
}

export const getTermsById = async (hermesAddress: string, tokenIds: number[]): Promise<TermI[]> => {
  const hermes = hermesContract(hermesAddress, getRPCProvider());
  const terms = await Promise.all(tokenIds.map((id) => hermes.loans(id)));
  return terms;
};

interface ListingI {
  lender: string;
  duration: number;
  price: BigNumber;
}

export const getListing = async (hermesAddress: string, tokenId: number): Promise<ListingI> => {
  if (isZeroAddress(hermesAddress)) {
    return { lender: "0x0", duration: 0, price: BigNumber.from(0) };
  }
  const hermes = hermesContract(hermesAddress, getRPCProvider());
  const listing = await hermes.listings(tokenId);
  return listing;
};

export const getDuration = async (hermesAddress: string, tokenId: number) => {
  if (isZeroAddress(hermesAddress)) {
    return 0;
  }
  const hermes = hermesContract(hermesAddress, getRPCProvider());
  const listing = await hermes.listings(tokenId);
  const { duration } = listing;
  return Math.floor(duration / DAYS_IN_SECONDS);
};
