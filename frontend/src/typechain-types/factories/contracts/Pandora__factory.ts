/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";
import type { PromiseOrValue } from "../../common";
import type { Pandora, PandoraInterface } from "../../contracts/Pandora";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_drachma",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "drachma",
    outputs: [
      {
        internalType: "contract Drachma",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610e24380380610e2483398101604081905261002f9161010e565b6000805460ff19169055610042336100b5565b600180556001600160a01b0381166100a05760405162461bcd60e51b815260206004820152601a60248201527f5b50616e646f72615d3a20496e76616c69642061646472657373000000000000604482015260640160405180910390fd5b60601b6001600160601b03191660805261013e565b600080546001600160a01b03838116610100818102610100600160a81b0319851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b60006020828403121561012057600080fd5b81516001600160a01b038116811461013757600080fd5b9392505050565b60805160601c610cc26101626000396000818160ba01526103490152610cc26000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063715018a611610066578063715018a61461010f5780638456cb59146101175780638da5cb5b1461011f578063bd83434514610135578063f2fde38b1461016357600080fd5b806338926b6d146100985780633f4ba83a146100ad578063522b9335146100b55780635c975abb146100f9575b600080fd5b6100ab6100a6366004610b56565b610176565b005b6100ab6103b8565b6100dc7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b60005460ff1660405190151581526020016100f0565b6100ab61043b565b6100ab610475565b60005461010090046001600160a01b03166100dc565b610155610143366004610b26565b60026020526000908152604090205481565b6040519081526020016100f0565b6100ab610171366004610b26565b6104d0565b60005460ff16156101a25760405162461bcd60e51b815260040161019990610bd2565b60405180910390fd5b600260015414156101f55760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610199565b600260015561020633848484610571565b61025e5760405162461bcd60e51b815260206004820152602360248201527f5b50616e646f72615d3a20496e76616c6964207369676e6572206f7220616d6f6044820152621d5b9d60ea1b6064820152608401610199565b336000908152600260205260409020548084116102bd5760405162461bcd60e51b815260206004820152601a60248201527f5b50616e646f72615d3a20416c726561647920636c61696d65640000000000006044820152606401610199565b60006102c98286610c49565b336000908152600260205260408120805492935083929091906102ed908490610c31565b9091555050604080514281526020810183905233917f987d620f307ff6b94d58743cb7a7509f24071586a77759b77c2d4e29f75a2f9a910160405180910390a26040516340c10f1960e01b8152336004820152602481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906340c10f1990604401600060405180830381600087803b15801561039557600080fd5b505af11580156103a9573d6000803e3d6000fd5b50506001805550505050505050565b6000546001600160a01b036101009091041633146103e85760405162461bcd60e51b815260040161019990610bfc565b60005460ff166104315760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610199565b61043961066d565b565b6000546001600160a01b0361010090910416331461046b5760405162461bcd60e51b815260040161019990610bfc565b6104396000610700565b6000546001600160a01b036101009091041633146104a55760405162461bcd60e51b815260040161019990610bfc565b60005460ff16156104c85760405162461bcd60e51b815260040161019990610bd2565b610439610759565b6000546001600160a01b036101009091041633146105005760405162461bcd60e51b815260040161019990610bfc565b6001600160a01b0381166105655760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610199565b61056e81610700565b50565b60408051606086901b6bffffffffffffffffffffffff19166020808301919091526034808301879052835180840390910181526054830184528051908201207f19457468657265756d205369676e6564204d6573736167653a0a333200000000607484015260908084018290528451808503909101815260b0909301909352815191012060009190829060005490915061010090046001600160a01b03166001600160a01b03166106588287878080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506107b192505050565b6001600160a01b031614979650505050505050565b60005460ff166106b65760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610199565b6000805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b03838116610100818102610100600160a81b0319851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b60005460ff161561077c5760405162461bcd60e51b815260040161019990610bd2565b6000805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586106e33390565b60008060006107c085856107d5565b915091506107cd81610845565b509392505050565b60008082516041141561080c5760208301516040840151606085015160001a61080087828585610a00565b9450945050505061083e565b825160401415610836576020830151604084015161082b868383610aed565b93509350505061083e565b506000905060025b9250929050565b600081600481111561085957610859610c76565b14156108625750565b600181600481111561087657610876610c76565b14156108c45760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610199565b60028160048111156108d8576108d8610c76565b14156109265760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610199565b600381600481111561093a5761093a610c76565b14156109935760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610199565b60048160048111156109a7576109a7610c76565b141561056e5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610199565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115610a375750600090506003610ae4565b8460ff16601b14158015610a4f57508460ff16601c14155b15610a605750600090506004610ae4565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610ab4573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610add57600060019250925050610ae4565b9150600090505b94509492505050565b6000806001600160ff1b03831681610b0a60ff86901c601b610c31565b9050610b1887828885610a00565b935093505050935093915050565b600060208284031215610b3857600080fd5b81356001600160a01b0381168114610b4f57600080fd5b9392505050565b600080600060408486031215610b6b57600080fd5b83359250602084013567ffffffffffffffff80821115610b8a57600080fd5b818601915086601f830112610b9e57600080fd5b813581811115610bad57600080fd5b876020828501011115610bbf57600080fd5b6020830194508093505050509250925092565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610c4457610c44610c60565b500190565b600082821015610c5b57610c5b610c60565b500390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea26469706673582212208c3729bcf9ea0941c0be1b895e2792a1ae28b0a08bb74eb9905b0d53c390679264736f6c63430008070033";

type PandoraConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PandoraConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Pandora__factory extends ContractFactory {
  constructor(...args: PandoraConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _drachma: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Pandora> {
    return super.deploy(_drachma, overrides || {}) as Promise<Pandora>;
  }
  override getDeployTransaction(
    _drachma: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_drachma, overrides || {});
  }
  override attach(address: string): Pandora {
    return super.attach(address) as Pandora;
  }
  override connect(signer: Signer): Pandora__factory {
    return super.connect(signer) as Pandora__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PandoraInterface {
    return new utils.Interface(_abi) as PandoraInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Pandora {
    return new Contract(address, _abi, signerOrProvider) as Pandora;
  }
}
