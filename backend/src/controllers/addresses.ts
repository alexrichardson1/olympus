import { RequestHandler } from "express";
import { Addresses, AddressesI } from "../models/addresses";

export const requestAllAddresses: RequestHandler = async (_req, res, next) => {
  const allAddresses: AddressesI | null = await Addresses.findOne({});
  if (!allAddresses) {
    return next(new Error("No contract addresses found"));
  }
  return res.json(allAddresses);
};

export const getAllAddresses = (): Promise<AddressesI | null> => {
  return Addresses.findOne({}).exec();
};
