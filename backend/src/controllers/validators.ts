import { check } from "express-validator";

export const tokenIdValidator = check("tokenId").isNumeric().withMessage("Invalid tokenId");

export const userAddressValidator = check("userAddress")
  .isEthereumAddress()
  .withMessage("Invalid address");
