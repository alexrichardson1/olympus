import { Provider } from "@ethersproject/providers";
import { getRPCProvider } from "utils/connectors";
import { isZeroAddress } from "utils/helpers";
import { Olympus__factory as OlympusFactory } from "../../typechain-types/factories/contracts/Olympus__factory";
import { approveDrachmaTransfer } from "./drachma";

export const olympusContract = (contractAddress: string, provider: Provider) => {
  return OlympusFactory.connect(contractAddress, provider);
};

export const approveOlympusTransfer = async (
  olympusAddress: string,
  contractAddress: string,
  library: any,
  tokenId: number
) => {
  const olympus = olympusContract(olympusAddress, library.getSigner());
  const approveTx = await olympus.approve(contractAddress, tokenId);
  await approveTx.wait();
};

export const openLootBox = async (
  drachmaAddress: string,
  olympusAddress: string,
  library: any,
  to: string
) => {
  try {
    const olympus = olympusContract(olympusAddress, library.getSigner());
    const amount = await olympus.PRICE();
    await approveDrachmaTransfer(drachmaAddress, olympusAddress, library, amount);
    const tx = await olympus.openLootBox(to);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

export const getOwnedTokenIds = async (olympusAddress: string, contractAddress: string) => {
  if (isZeroAddress(olympusAddress) || isZeroAddress(contractAddress)) {
    return [];
  }
  const olympus = olympusContract(olympusAddress, getRPCProvider());
  const balance = await olympus.balanceOf(contractAddress);
  console.log(`balance ${balance}`);
  if (balance.eq(0)) {
    return [];
  }
  const arr = Array.from(Array(balance.toNumber()).keys());
  const ids = await Promise.all(
    arr.map(async (index) => {
      const tokenId = await olympus.tokenOfOwnerByIndex(contractAddress, index);
      return tokenId.toNumber();
    })
  );
  return ids;
};
