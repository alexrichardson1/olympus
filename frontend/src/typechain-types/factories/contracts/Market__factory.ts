/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";
import type { PromiseOrValue } from "../../common";
import type { Market, MarketInterface } from "../../contracts/Market";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_drachma",
        type: "address",
      },
      {
        internalType: "address",
        name: "_olympus",
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
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "AddListing",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "Buy",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "RemoveListing",
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "addListing",
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
    name: "balances",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "changeSellingPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "drachma",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listings",
    outputs: [
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "olympus",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "removeListing",
    outputs: [],
    stateMutability: "nonpayable",
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
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b506040516200164038038062001640833981016040819052620000349162000192565b6000805460ff1916905562000049336200011c565b6001600160a01b038216620000a55760405162461bcd60e51b815260206004820152601960248201527f5b4d61726b65745d3a20496e76616c696420616464726573730000000000000060448201526064015b60405180910390fd5b6001600160a01b038116620000fd5760405162461bcd60e51b815260206004820152601960248201527f5b4d61726b65745d3a20496e76616c696420616464726573730000000000000060448201526064016200009c565b6001600160601b0319606092831b8116608052911b1660a052620001ca565b600080546001600160a01b03838116610100818102610100600160a81b0319851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b80516001600160a01b03811681146200018d57600080fd5b919050565b60008060408385031215620001a657600080fd5b620001b18362000175565b9150620001c16020840162000175565b90509250929050565b60805160601c60a05160601c6114126200022e600039600081816102d001528181610440015281816105380152818161061a015281816107a90152818161091d0152610b6c0152600081816101a4015281816103390152610b2d01526114126000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063715018a6116100a2578063bbb2c10911610071578063bbb2c10914610240578063d96a094a14610253578063de74e57b14610266578063f2fde38b146102b8578063f32f6a23146102cb57600080fd5b8063715018a614610207578063836cf6e91461020f5780638456cb59146102225780638da5cb5b1461022a57600080fd5b8063479ad4c3116100de578063479ad4c31461018c578063522b93351461019f5780635312ea8e146101de5780635c975abb146101f157600080fd5b8063150b7a021461011057806327e235e31461014c5780633ccfd60b1461017a5780633f4ba83a14610184575b600080fd5b61012e61011e3660046110d6565b630a85bd0160e11b949350505050565b6040516001600160e01b031990911681526020015b60405180910390f35b61016c61015a36600461109c565b60026020526000908152604090205481565b604051908152602001610143565b6101826102f2565b005b61018261036b565b61018261019a3660046111d8565b6103c7565b6101c67f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610143565b6101826101ec3660046111d8565b6104ae565b60005460ff166040519015158152602001610143565b6101826105a7565b61018261021d3660046111f1565b6105e1565b610182610819565b60005461010090046001600160a01b03166101c6565b61018261024e3660046111f1565b610874565b6101826102613660046111d8565b6108e4565b6102996102743660046111d8565b600160208190526000918252604090912080549101546001600160a01b039091169082565b604080516001600160a01b039093168352602083019190915201610143565b6101826102c636600461109c565b610ba5565b6101c67f000000000000000000000000000000000000000000000000000000000000000081565b60005460ff161561031e5760405162461bcd60e51b8152600401610315906112b4565b60405180910390fd5b336000818152600260205260408120805491905590610368907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169083610c43565b50565b6000546001600160a01b0361010090910416331461039b5760405162461bcd60e51b81526004016103159061132a565b60005460ff166103bd5760405162461bcd60e51b815260040161031590611286565b6103c5610cab565b565b60005460ff16156103ea5760405162461bcd60e51b8152600401610315906112b4565b6000818152600160205260409020546001600160a01b031633146104205760405162461bcd60e51b8152600401610315906112de565b61042981610d17565b604051632142170760e11b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906342842e0e906104799030903390869060040161122f565b600060405180830381600087803b15801561049357600080fd5b505af11580156104a7573d6000803e3d6000fd5b5050505050565b6000546001600160a01b036101009091041633146104de5760405162461bcd60e51b81526004016103159061132a565b60005460ff166105005760405162461bcd60e51b815260040161031590611286565b6000818152600160205260409020546001600160a01b031661052182610d17565b604051632142170760e11b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906342842e0e906105719030908590879060040161122f565b600060405180830381600087803b15801561058b57600080fd5b505af115801561059f573d6000803e3d6000fd5b505050505050565b6000546001600160a01b036101009091041633146105d75760405162461bcd60e51b81526004016103159061132a565b6103c56000610d6f565b60005460ff16156106045760405162461bcd60e51b8152600401610315906112b4565b6040516331a9108f60e11b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e9060240160206040518083038186803b15801561066457600080fd5b505afa158015610678573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069c91906110b9565b6001600160a01b0316336001600160a01b0316146107105760405162461bcd60e51b815260206004820152602b60248201527f5b4d61726b65745d3a20596f7520617265206e6f7420746865206f776e65722060448201526a1bd9881d1a1a5cc813919560aa1b6064820152608401610315565b6040805180820182523380825260208083018581526000878152600180845290869020855181546001600160a01b0319166001600160a01b03909116178155915191015583519182528101859052918201839052907f3237f8e6fb537b5fb5266d4e6eaaf40f0aaecca3811dcc52b395c9ca574124e79060600160405180910390a1604051632142170760e11b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906342842e0e906107e29033903090889060040161122f565b600060405180830381600087803b1580156107fc57600080fd5b505af1158015610810573d6000803e3d6000fd5b50505050505050565b6000546001600160a01b036101009091041633146108495760405162461bcd60e51b81526004016103159061132a565b60005460ff161561086c5760405162461bcd60e51b8152600401610315906112b4565b6103c5610dc8565b60005460ff16156108975760405162461bcd60e51b8152600401610315906112b4565b6000828152600160205260409020546001600160a01b031633146108cd5760405162461bcd60e51b8152600401610315906112de565b600091825260016020819052604090922090910155565b60005460ff16156109075760405162461bcd60e51b8152600401610315906112b4565b6040516331a9108f60e11b8152600481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e9060240160206040518083038186803b15801561096757600080fd5b505afa15801561097b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099f91906110b9565b6001600160a01b0316306001600160a01b031614610a0a5760405162461bcd60e51b815260206004820152602260248201527f5b4d61726b65745d3a2054686973204e4654206973206e6f7420666f722073616044820152616c6560f01b6064820152608401610315565b6000818152600160205260409020546001600160a01b0316331415610a7f5760405162461bcd60e51b815260206004820152602560248201527f5b4d61726b65745d3a20596f752063616e6e6f742062757920796f7572206f776044820152641b8813919560da1b6064820152608401610315565b600081815260016020818152604080842080549301546001600160a01b0390931680855260029092528320805491938392610abb90849061135f565b90915550610aca905083610d17565b60408051428152602081018390529081018490526001600160a01b03831660608201523360808201527f948ae23a74f39b04626124c8efaed4a8c6038737c2ad1fddb4afec476fc122ab9060a00160405180910390a1610b556001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016333084610e20565b604051632142170760e11b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906342842e0e906107e29030903390889060040161122f565b6000546001600160a01b03610100909104163314610bd55760405162461bcd60e51b81526004016103159061132a565b6001600160a01b038116610c3a5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610315565b61036881610d6f565b6040516001600160a01b038316602482015260448101829052610ca690849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610e47565b505050565b60005460ff16610ccd5760405162461bcd60e51b815260040161031590611286565b6000805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600081815260016020818152604080842080546001600160a01b031916815590920192909255518281527fca84ca6d01d752679a9eddecd56bc517d62370bc1f6a51bfb09d2221a709258f910160405180910390a150565b600080546001600160a01b03838116610100818102610100600160a81b0319851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b60005460ff1615610deb5760405162461bcd60e51b8152600401610315906112b4565b6000805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610cfa3390565b610e41846323b872dd60e01b858585604051602401610c6f9392919061122f565b50505050565b6000610e9c826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610f199092919063ffffffff16565b805190915015610ca65780806020019051810190610eba91906111b6565b610ca65760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610315565b6060610f288484600085610f32565b90505b9392505050565b606082471015610f935760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610315565b6001600160a01b0385163b610fea5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610315565b600080866001600160a01b031685876040516110069190611213565b60006040518083038185875af1925050503d8060008114611043576040519150601f19603f3d011682016040523d82523d6000602084013e611048565b606091505b5091509150611058828286611063565b979650505050505050565b60608315611072575081610f2b565b8251156110825782518084602001fd5b8160405162461bcd60e51b81526004016103159190611253565b6000602082840312156110ae57600080fd5b8135610f2b816113c7565b6000602082840312156110cb57600080fd5b8151610f2b816113c7565b600080600080608085870312156110ec57600080fd5b84356110f7816113c7565b93506020850135611107816113c7565b925060408501359150606085013567ffffffffffffffff8082111561112b57600080fd5b818701915087601f83011261113f57600080fd5b813581811115611151576111516113b1565b604051601f8201601f19908116603f01168101908382118183101715611179576111796113b1565b816040528281528a602084870101111561119257600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000602082840312156111c857600080fd5b81518015158114610f2b57600080fd5b6000602082840312156111ea57600080fd5b5035919050565b6000806040838503121561120457600080fd5b50508035926020909101359150565b60008251611225818460208701611385565b9190910192915050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6020815260008251806020840152611272816040850160208701611385565b601f01601f19169190910160400192915050565b60208082526014908201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604082015260600190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b6020808252602c908201527f5b4d61726b65745d3a20596f7520617265206e6f74207468652073656c6c657260408201526b081bd9881d1a1a5cc813919560a21b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000821982111561138057634e487b7160e01b600052601160045260246000fd5b500190565b60005b838110156113a0578181015183820152602001611388565b83811115610e415750506000910152565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461036857600080fdfea26469706673582212207df962b148eede5a3c3605e0b704ca24b87b8806357f1bbc35ce1de960e7978764736f6c63430008070033";

type MarketConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Market__factory extends ContractFactory {
  constructor(...args: MarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _drachma: PromiseOrValue<string>,
    _olympus: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Market> {
    return super.deploy(_drachma, _olympus, overrides || {}) as Promise<Market>;
  }
  override getDeployTransaction(
    _drachma: PromiseOrValue<string>,
    _olympus: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_drachma, _olympus, overrides || {});
  }
  override attach(address: string): Market {
    return super.attach(address) as Market;
  }
  override connect(signer: Signer): Market__factory {
    return super.connect(signer) as Market__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketInterface {
    return new utils.Interface(_abi) as MarketInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Market {
    return new Contract(address, _abi, signerOrProvider) as Market;
  }
}