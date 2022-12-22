interface AttributeI {
  trait_type: string;
  value: number | string;
}

interface MetaDataI {
  _id: number;
  name: string;
  description: string;
  image: string;
  attributes: AttributeI[];
}

type Link = `http://${string}`;
