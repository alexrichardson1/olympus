import { BigNumber, constants, ethers, utils } from "ethers";
import { RequestHandler } from "express";
import { Olympus__factory as OlympusFactory } from "../../typechain-types";
import { randInt } from "../generateImages";
import { Addresses, AddressesI, ContractIndex } from "../models/addresses";
import { Rewards } from "../models/game";
import { AttributeI, MetaData, MetaDataI } from "../models/metadata";
import { getRPCProvider } from "./common";

// const MAX_STRENGTH = 100;
const REWARD = 5;

export enum Trait {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors",
}

enum Result {
  Win = "win",
  Draw = "draw",
  Loss = "loss",
}

const rps = (
  user: Trait,
  opp: Trait,
  userStrength: string | number,
  oppStrength: string | number
): Result => {
  if (user === opp) {
    if (userStrength > oppStrength) {
      return Result.Win;
    }
    if (userStrength < oppStrength) {
      return Result.Loss;
    }
    return Result.Draw;
  }
  if (
    (user === Trait.Rock && opp === Trait.Scissors) ||
    (user === Trait.Paper && opp === Trait.Rock) ||
    (user === Trait.Scissors && opp === Trait.Paper)
  ) {
    return Result.Win;
  }
  return Result.Loss;
};

const toTrait = (str: string | number): Trait => {
  switch (str) {
    case "rock":
      return Trait.Rock;
    case "paper":
      return Trait.Paper;
    case "scissors":
      return Trait.Scissors;
    default:
      throw new Error("Invalid trait");
  }
};

export const getStrength = (attributes: AttributeI[]): number => {
  const strength = attributes.find((attr) => attr["trait_type"] === "strength");
  if (!strength) {
    throw Error("No strength attribute");
  }
  return strength["value"] as number;
};

export const getTrait = (attributes: AttributeI[]): string => {
  const trait = attributes.find((attr) => attr["trait_type"] === "trait");
  if (!trait) {
    throw Error("No trait attribute");
  }
  return trait["value"] as string;
};

export const executeGame: RequestHandler = async (req, res, next) => {
  const { userAddress, tokenId } = req.params;

  if (!tokenId || !userAddress) {
    return next(new Error("Invalid parameters"));
  }

  const tokenNumber = parseInt(tokenId);
  const metaData: MetaDataI | null = await MetaData.findById(tokenNumber);
  if (!metaData) {
    return next(new Error("Token id not found"));
  }

  const allAddresses: AddressesI | null = await Addresses.findOne({});
  if (!allAddresses) {
    return next(new Error("No contract addresses found"));
  }

  const gameAddress = allAddresses.addresses[ContractIndex.Game];
  const olympusAddress = allAddresses.addresses[ContractIndex.Olympus];
  if (!gameAddress || !olympusAddress) {
    return next(new Error("Invalid contract addresses found"));
  }

  const olympusContract = OlympusFactory.connect(olympusAddress, getRPCProvider());
  const opponentBalance = await olympusContract.balanceOf(gameAddress);

  if (opponentBalance.eq(0)) {
    return next(new Error("No opponent found"));
  }

  const opponentId = randInt(opponentBalance.toNumber());
  const opponentMeta = await MetaData.findById(opponentId).exec();
  if (!opponentMeta) {
    return next(new Error("Token id not found"));
  }

  const gameResult = rps(
    toTrait("rock"),
    toTrait("scissors"),
    getStrength(metaData.attributes),
    getStrength(opponentMeta.attributes)
  );

  if (gameResult !== Result.Win) {
    return res.send({ result: false, opponentMeta });
  }

  req.body.opponentMeta = opponentMeta;
  return next();
};

const wallet = new ethers.Wallet(process.env.DEV_WALLET_PRIVATE_KEY || "");

const toSignature = (address: string, amount: BigNumber) => {
  const messageHash = utils.solidityKeccak256(["address", "uint256"], [address, amount]);
  const messageHashBinary = utils.arrayify(messageHash);
  return wallet.signMessage(messageHashBinary);
};

export const updateRewards: RequestHandler = async (req, res, next) => {
  const { userAddress } = req.params;
  const { opponentMeta }: { opponentMeta: MetaDataI } = req.body;

  if (!userAddress) {
    return next(new Error("Invalid parameters"));
  }

  let reward = await Rewards.findById(userAddress);
  const amountInWei = constants.WeiPerEther.mul(REWARD);

  if (reward) {
    const amount = BigNumber.from(reward.amount).add(amountInWei);
    reward.amount = amount.toString();
    reward.signature = await toSignature(userAddress, amount);
  } else {
    const signature = await toSignature(userAddress, amountInWei);
    reward = new Rewards({
      _id: userAddress,
      amount: amountInWei.toString(),
      signature,
    });
  }

  await reward.save();
  return res.send({ result: true, opponentMeta });
};

export const claimRewards: RequestHandler = async (req, res, next) => {
  const { userAddress } = req.params;

  if (!userAddress) {
    return next(new Error("Invalid parameters"));
  }

  const reward = await Rewards.findById(userAddress);
  if (!reward) {
    return next(new Error("No rewards found"));
  }

  return res.send(reward);
};
