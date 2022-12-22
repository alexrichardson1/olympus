import { RequestHandler } from "express";
import { MetaData, MetaDataI } from "../models/metadata";

export const requestNFTMetadata: RequestHandler = async (req, res, next) => {
  const { tokenId } = req.params;

  if (!tokenId) {
    return next(new Error("Invalid parameters"));
  }
  const tokenNumber = parseInt(tokenId);
  if (tokenNumber < 0) {
    return next(new Error("Invalid token id"));
  }
  const metaData = await MetaData.findById(tokenNumber);
  if (!metaData) {
    return next(new Error("Token id not found"));
  }
  return res.json(metaData);
};

export const getNFTMetadataByIds = async (tokenIds: number[]): Promise<MetaDataI[]> => {
  if (tokenIds === null || tokenIds === undefined) {
    return [];
  }
  const metaData = await MetaData.find({ _id: tokenIds }).exec();
  return metaData;
};

export const requestNFTMetadataByIds: RequestHandler = async (req, res, next) => {
  const ids = req.query.tokens as string[];
  const tokenIds = ids.map((id: string) => parseInt(id));
  if (tokenIds === null || tokenIds === undefined) {
    return next(new Error("Invalid parameters"));
  }
  const metaData = await MetaData.find({ _id: tokenIds });
  return res.json({ metaData });
};

export const requestAllNFTMetadata: RequestHandler = async (req, res) => {
  const allMetaData: MetaDataI[] = await MetaData.find({});
  return res.json({ allMetaData });
};

export const getAllNFTMetadata = (): Promise<MetaDataI[]> => {
  return MetaData.find({}).exec();
};
