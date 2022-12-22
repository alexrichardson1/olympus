export const isZeroAddress = (address: string) => {
  return address === "0x0";
};

export const getStrength = (attributes: AttributeI[]): number => {
  const strength = attributes.find((attr) => attr["trait_type"] === "strength");
  if (!strength) {
    throw Error("No strength attribute");
  }
  return strength["value"] as number;
};

export const getTrait = (attributes: AttributeI[]): string => {
  const trait = attributes.find((attr) => attr["trait_type"] === "trait");
  if (!trait) {
    throw Error("No trait attribute");
  }
  return (trait["value"] as string).replace(".png", "");
};
