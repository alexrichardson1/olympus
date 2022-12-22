import { model, Schema } from "mongoose";

export enum ContractIndex {
  Drachma,
  Olympus,
  Market,
  Hermes,
  Plutus,
  Gold,
  Game,
  Zeus,
  Pandora,
}

export interface AddressesI {
  addresses: string[];
}

const addressesSchema = new Schema<AddressesI>({
  addresses: [{ type: String }],
});

export const Addresses = model("Addresses", addressesSchema);
