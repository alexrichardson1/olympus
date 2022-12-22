import { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { Pandora__factory as PandoraFactory } from "../../typechain-types/factories/contracts/Pandora__factory";

export const pandoraContract = (pandoraAddress: string, provider: Provider) => {
  return PandoraFactory.connect(pandoraAddress, provider);
};

export const claim = async (
  pandoraAddress: string,
  library: any,
  balance: BigNumber,
  signature: any
) => {
  try {
    const pandora = pandoraContract(pandoraAddress, library.getSigner());
    const tx = await pandora.claim(balance, signature);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};
