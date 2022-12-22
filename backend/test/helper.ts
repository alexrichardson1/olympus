import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { fail } from "assert";

function checkSigner(signer: SignerWithAddress | undefined): SignerWithAddress {
  if (!signer) {
    fail("Signer is undefined");
  }
  return signer;
}

export { checkSigner };
