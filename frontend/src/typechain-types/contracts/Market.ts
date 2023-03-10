/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  OnEvent,
  PromiseOrValue,
  TypedEvent,
  TypedEventFilter,
  TypedListener,
} from "../common";

export interface MarketInterface extends utils.Interface {
  functions: {
    "addListing(uint256,uint256)": FunctionFragment;
    "balances(address)": FunctionFragment;
    "buy(uint256)": FunctionFragment;
    "changeSellingPrice(uint256,uint256)": FunctionFragment;
    "drachma()": FunctionFragment;
    "emergencyWithdraw(uint256)": FunctionFragment;
    "listings(uint256)": FunctionFragment;
    "olympus()": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "removeListing(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unpause()": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addListing"
      | "balances"
      | "buy"
      | "changeSellingPrice"
      | "drachma"
      | "emergencyWithdraw"
      | "listings"
      | "olympus"
      | "onERC721Received"
      | "owner"
      | "pause"
      | "paused"
      | "removeListing"
      | "renounceOwnership"
      | "transferOwnership"
      | "unpause"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addListing",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "balances", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "buy", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(
    functionFragment: "changeSellingPrice",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "drachma", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdraw",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "listings", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "olympus", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeListing",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "addListing", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balances", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "changeSellingPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "drachma", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "emergencyWithdraw", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "listings", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "olympus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeListing", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "AddListing(address,uint256,uint256)": EventFragment;
    "Buy(uint256,uint256,uint256,address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "RemoveListing(uint256)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddListing"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Buy"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveListing"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export interface AddListingEventObject {
  seller: string;
  tokenId: BigNumber;
  price: BigNumber;
}
export type AddListingEvent = TypedEvent<[string, BigNumber, BigNumber], AddListingEventObject>;

export type AddListingEventFilter = TypedEventFilter<AddListingEvent>;

export interface BuyEventObject {
  time: BigNumber;
  price: BigNumber;
  tokenId: BigNumber;
  seller: string;
  buyer: string;
}
export type BuyEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, string, string],
  BuyEventObject
>;

export type BuyEventFilter = TypedEventFilter<BuyEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;

export interface PausedEventObject {
  account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface RemoveListingEventObject {
  tokenId: BigNumber;
}
export type RemoveListingEvent = TypedEvent<[BigNumber], RemoveListingEventObject>;

export type RemoveListingEventFilter = TypedEventFilter<RemoveListingEvent>;

export interface UnpausedEventObject {
  account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface Market extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addListing(
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balances(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    buy(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changeSellingPrice(
      tokenId: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    drachma(overrides?: CallOverrides): Promise<[string]>;

    emergencyWithdraw(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    listings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { seller: string; price: BigNumber }>;

    olympus(overrides?: CallOverrides): Promise<[string]>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    removeListing(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addListing(
    tokenId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balances(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  buy(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changeSellingPrice(
    tokenId: PromiseOrValue<BigNumberish>,
    newPrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  drachma(overrides?: CallOverrides): Promise<string>;

  emergencyWithdraw(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  listings(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { seller: string; price: BigNumber }>;

  olympus(overrides?: CallOverrides): Promise<string>;

  onERC721Received(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    arg3: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  removeListing(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unpause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  withdraw(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  callStatic: {
    addListing(
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    balances(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    buy(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;

    changeSellingPrice(
      tokenId: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    drachma(overrides?: CallOverrides): Promise<string>;

    emergencyWithdraw(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    listings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { seller: string; price: BigNumber }>;

    olympus(overrides?: CallOverrides): Promise<string>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    removeListing(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "AddListing(address,uint256,uint256)"(
      seller?: null,
      tokenId?: null,
      price?: null
    ): AddListingEventFilter;
    AddListing(seller?: null, tokenId?: null, price?: null): AddListingEventFilter;

    "Buy(uint256,uint256,uint256,address,address)"(
      time?: null,
      price?: null,
      tokenId?: null,
      seller?: null,
      buyer?: null
    ): BuyEventFilter;
    Buy(time?: null, price?: null, tokenId?: null, seller?: null, buyer?: null): BuyEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Paused(address)"(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    "RemoveListing(uint256)"(tokenId?: null): RemoveListingEventFilter;
    RemoveListing(tokenId?: null): RemoveListingEventFilter;

    "Unpaused(address)"(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;
  };

  estimateGas: {
    addListing(
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balances(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    buy(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changeSellingPrice(
      tokenId: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    drachma(overrides?: CallOverrides): Promise<BigNumber>;

    emergencyWithdraw(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    listings(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    olympus(overrides?: CallOverrides): Promise<BigNumber>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    removeListing(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unpause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    withdraw(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;
  };

  populateTransaction: {
    addListing(
      tokenId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balances(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    buy(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changeSellingPrice(
      tokenId: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    drachma(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    emergencyWithdraw(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    listings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    olympus(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeListing(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
