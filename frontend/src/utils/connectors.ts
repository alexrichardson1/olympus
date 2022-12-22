import { BaseProvider, Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { getContractAddress } from "./api";
import { ContractIndex } from "./constants";

const RINKEBY_CHAIN_ID = 4;

export const injected = new InjectedConnector({
  supportedChainIds: [RINKEBY_CHAIN_ID],
});

export const getRPCProvider = (): BaseProvider => {
  const network = ethers.providers.getNetwork(RINKEBY_CHAIN_ID);
  return new ethers.providers.InfuraProvider(network, process.env["REACT_APP_INFURA_PROJECT_ID"]);
};

export const addToken = async (library: Web3Provider, assetInfo: any) => {
  await library
    .send("wallet_watchAsset", assetInfo as unknown as any[])
    .then(() => console.log("token added"))
    .catch((err) => console.error(err));
};

const DECIMALS = 18;
// const TOKEN_IMAGE = "../images/drachma.png";

export const addDCMToken = async (library: Web3Provider) => {
  const addresses = await getContractAddress();
  const drachmaAddress = addresses[ContractIndex.Drachma];

  const assetInfo = {
    type: "ERC20",
    options: {
      address: drachmaAddress,
      symbol: "DCM",
      decimals: DECIMALS,
      // image: TOKEN_IMAGE,
    },
  };
  await addToken(library, assetInfo);
};

export const addOMPToken = async (library: Web3Provider) => {
  const addresses = await getContractAddress();
  const drachmaAddress = addresses[ContractIndex.Olympus];

  const assetInfo = {
    type: "ERC721",
    options: {
      address: drachmaAddress,
      symbol: "OMP",
      // image: TOKEN_IMAGE,
    },
  };
  await addToken(library, assetInfo);
};
