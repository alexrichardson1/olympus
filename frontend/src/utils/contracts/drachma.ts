import { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { Drachma__factory as DrachmaFactory } from "../../typechain-types/factories/contracts/Drachma__factory";

const drachmaContract = (contractAddress: string, provider: Provider) => {
  return DrachmaFactory.connect(contractAddress, provider);
};

export const approveDrachmaTransfer = async (
  drachmaAddress: string,
  contractAddress: string,
  library: any,
  amount: BigNumber
) => {
  const drachma = drachmaContract(drachmaAddress, library.getSigner());
  const approveTx = await drachma.approve(contractAddress, amount);
  await approveTx.wait();
};
