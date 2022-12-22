import { model, Schema } from "mongoose";

export interface LoanI {
  _id: number;
}

const loansSchema = new Schema<LoanI>({
  _id: Number,
});

export const Loans = model("Loans", loansSchema);
