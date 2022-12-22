import { model, Schema } from "mongoose";

export interface RewardsI {
  _id: string;
  amount: string;
  signature: string;
}

const rewardsSchema = new Schema<RewardsI>({
  _id: String,
  amount: String,
  signature: String,
});

export const Rewards = model("Rewards", rewardsSchema);
