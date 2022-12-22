import { model, Schema } from "mongoose";

export interface SaleI {
  tokenId: number;
  time: number;
  price: number;
}

export interface SaleDataI {
  time: number;
  trait: 0 | 1 | 2;
  strength: number;
  prediction: number;
}

const salesSchema = new Schema<SaleI>({
  tokenId: Number,
  time: Number,
  price: Number,
});

export const Sales = model("Sales", salesSchema);
