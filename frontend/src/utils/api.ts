import axios from "axios";
import { API_URL } from "./constants";

// metadata

export const getMetaDataByTokenIds = async (tokenIds: number[]): Promise<MetaDataI[]> => {
  console.log(`tokenIds ${tokenIds}`);
  if (tokenIds.length === 0) {
    return [];
  }
  const res = await axios.get(`${API_URL}/metadata/tokenIds`, {
    params: {
      tokens: tokenIds,
    },
  });
  const { metaData } = res.data;
  return metaData;
};

// addresses

interface AddressResI {
  addresses: string[];
}

export const getContractAddress = async (): Promise<string[]> => {
  const res = await axios.get(`${API_URL}/addresses`);
  const { addresses }: AddressResI = res.data;
  return addresses;
};

// game

interface ResultI {
  result: boolean;
  opponentMeta: MetaDataI;
}

export const play = async (address: string, id: number): Promise<ResultI> => {
  const res = await axios.get(`${API_URL}/game/play/${address}/${id}`);
  return res.data;
};

interface RewardsI {
  _id: string;
  amount: string;
  signature: string;
}

export const claimRewards = async (address: string): Promise<RewardsI> => {
  const res = await axios.get(`${API_URL}/game/claim/${address}`);
  return res.data;
};
