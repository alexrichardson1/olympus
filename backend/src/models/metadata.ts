import { model, Schema } from "mongoose";

export interface AttributeI {
  trait_type: string;
  value: number | string;
}

export interface MetaDataI {
  _id: number;
  name: string;
  description: string;
  image: string;
  attributes: AttributeI[];
}

const metaDataSchema = new Schema<MetaDataI>({
  _id: Number,
  name: String,
  description: String,
  image: String,
  attributes: [
    {
      type: Map,
      of: Schema.Types.Mixed,
    },
  ],
});

export const MetaData = model("MetaData", metaDataSchema);
