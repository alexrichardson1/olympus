import { Provider } from "@ethersproject/providers";
import { Zeus__factory as ZeusFactory } from "../../typechain-types/factories/contracts/Zeus__factory";

const zeusContract = (contractAddress: string, provider: Provider) => {
  return ZeusFactory.connect(contractAddress, provider);
};

export const castVote = async (zeusAddress: string, library: any, vote: number) => {
  try {
    const zeus = zeusContract(zeusAddress, library.getSigner());
    const tx = await zeus.castVote(vote, 0);
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};
