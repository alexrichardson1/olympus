/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  Pausable,
  PausableInterface,
} from "../../../../@openzeppelin/contracts/security/Pausable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class Pausable__factory {
  static readonly abi = _abi;
  static createInterface(): PausableInterface {
    return new utils.Interface(_abi) as PausableInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Pausable {
    return new Contract(address, _abi, signerOrProvider) as Pausable;
  }
}
