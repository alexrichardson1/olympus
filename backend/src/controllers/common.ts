import { BaseProvider } from "@ethersproject/providers";
import { S3 } from "aws-sdk";
import dotenv from "dotenv";
import { ethers } from "ethers";
import { RequestHandler } from "express";
import { validationResult } from "express-validator";

dotenv.config();

export const ERROR_STATUS = 400;

export const errorHandler: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(ERROR_STATUS).json({ errors: errors.array() });
  }
  return next();
};

export const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const RINKEBY_CHAIN_ID = 4;

export const getRPCProvider = (): BaseProvider => {
  const network = ethers.providers.getNetwork(RINKEBY_CHAIN_ID);
  return new ethers.providers.InfuraProvider(network, process.env["INFURA_PROJECT_ID"]);
};
