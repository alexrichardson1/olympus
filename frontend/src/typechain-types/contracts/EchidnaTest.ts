/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { OnEvent, TypedEvent, TypedEventFilter, TypedListener } from "../common";

export interface EchidnaTestInterface extends utils.Interface {
  functions: {
    "drachma()": FunctionFragment;
    "echidnaHermesDrachmaAddressCannotChange()": FunctionFragment;
    "echidnaHermesDrachmaAddressIsNotZero()": FunctionFragment;
    "echidnaHermesOlympusAddressCannotChange()": FunctionFragment;
    "echidnaHermesOlympusAddressIsNotZero()": FunctionFragment;
    "echidnaMarketDrachmaAddressCannotChange()": FunctionFragment;
    "echidnaMarketDrachmaAddressIsNotZero()": FunctionFragment;
    "echidnaMarketOlympusAddressCannotChange()": FunctionFragment;
    "echidnaMarketOlympusAddressIsNotZero()": FunctionFragment;
    "hermes()": FunctionFragment;
    "market()": FunctionFragment;
    "olympus()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "drachma"
      | "echidnaHermesDrachmaAddressCannotChange"
      | "echidnaHermesDrachmaAddressIsNotZero"
      | "echidnaHermesOlympusAddressCannotChange"
      | "echidnaHermesOlympusAddressIsNotZero"
      | "echidnaMarketDrachmaAddressCannotChange"
      | "echidnaMarketDrachmaAddressIsNotZero"
      | "echidnaMarketOlympusAddressCannotChange"
      | "echidnaMarketOlympusAddressIsNotZero"
      | "hermes"
      | "market"
      | "olympus"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "drachma", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "echidnaHermesDrachmaAddressCannotChange",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "echidnaHermesDrachmaAddressIsNotZero",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "echidnaHermesOlympusAddressCannotChange",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "echidnaHermesOlympusAddressIsNotZero",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "echidnaMarketDrachmaAddressCannotChange",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "echidnaMarketDrachmaAddressIsNotZero",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "echidnaMarketOlympusAddressCannotChange",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "echidnaMarketOlympusAddressIsNotZero",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "hermes", values?: undefined): string;
  encodeFunctionData(functionFragment: "market", values?: undefined): string;
  encodeFunctionData(functionFragment: "olympus", values?: undefined): string;

  decodeFunctionResult(functionFragment: "drachma", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "echidnaHermesDrachmaAddressCannotChange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "echidnaHermesDrachmaAddressIsNotZero",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "echidnaHermesOlympusAddressCannotChange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "echidnaHermesOlympusAddressIsNotZero",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "echidnaMarketDrachmaAddressCannotChange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "echidnaMarketDrachmaAddressIsNotZero",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "echidnaMarketOlympusAddressCannotChange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "echidnaMarketOlympusAddressIsNotZero",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hermes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "market", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "olympus", data: BytesLike): Result;

  events: {};
}

export interface EchidnaTest extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EchidnaTestInterface;

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
    drachma(overrides?: CallOverrides): Promise<[string]>;

    echidnaHermesDrachmaAddressCannotChange(overrides?: CallOverrides): Promise<[boolean]>;

    echidnaHermesDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<[boolean]>;

    echidnaHermesOlympusAddressCannotChange(overrides?: CallOverrides): Promise<[boolean]>;

    echidnaHermesOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<[boolean]>;

    echidnaMarketDrachmaAddressCannotChange(overrides?: CallOverrides): Promise<[boolean]>;

    echidnaMarketDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<[boolean]>;

    echidnaMarketOlympusAddressCannotChange(overrides?: CallOverrides): Promise<[boolean]>;

    echidnaMarketOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<[boolean]>;

    hermes(overrides?: CallOverrides): Promise<[string]>;

    market(overrides?: CallOverrides): Promise<[string]>;

    olympus(overrides?: CallOverrides): Promise<[string]>;
  };

  drachma(overrides?: CallOverrides): Promise<string>;

  echidnaHermesDrachmaAddressCannotChange(overrides?: CallOverrides): Promise<boolean>;

  echidnaHermesDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<boolean>;

  echidnaHermesOlympusAddressCannotChange(overrides?: CallOverrides): Promise<boolean>;

  echidnaHermesOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<boolean>;

  echidnaMarketDrachmaAddressCannotChange(overrides?: CallOverrides): Promise<boolean>;

  echidnaMarketDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<boolean>;

  echidnaMarketOlympusAddressCannotChange(overrides?: CallOverrides): Promise<boolean>;

  echidnaMarketOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<boolean>;

  hermes(overrides?: CallOverrides): Promise<string>;

  market(overrides?: CallOverrides): Promise<string>;

  olympus(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    drachma(overrides?: CallOverrides): Promise<string>;

    echidnaHermesDrachmaAddressCannotChange(overrides?: CallOverrides): Promise<boolean>;

    echidnaHermesDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<boolean>;

    echidnaHermesOlympusAddressCannotChange(overrides?: CallOverrides): Promise<boolean>;

    echidnaHermesOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<boolean>;

    echidnaMarketDrachmaAddressCannotChange(overrides?: CallOverrides): Promise<boolean>;

    echidnaMarketDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<boolean>;

    echidnaMarketOlympusAddressCannotChange(overrides?: CallOverrides): Promise<boolean>;

    echidnaMarketOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<boolean>;

    hermes(overrides?: CallOverrides): Promise<string>;

    market(overrides?: CallOverrides): Promise<string>;

    olympus(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    drachma(overrides?: CallOverrides): Promise<BigNumber>;

    echidnaHermesDrachmaAddressCannotChange(overrides?: CallOverrides): Promise<BigNumber>;

    echidnaHermesDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<BigNumber>;

    echidnaHermesOlympusAddressCannotChange(overrides?: CallOverrides): Promise<BigNumber>;

    echidnaHermesOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<BigNumber>;

    echidnaMarketDrachmaAddressCannotChange(overrides?: CallOverrides): Promise<BigNumber>;

    echidnaMarketDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<BigNumber>;

    echidnaMarketOlympusAddressCannotChange(overrides?: CallOverrides): Promise<BigNumber>;

    echidnaMarketOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<BigNumber>;

    hermes(overrides?: CallOverrides): Promise<BigNumber>;

    market(overrides?: CallOverrides): Promise<BigNumber>;

    olympus(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    drachma(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    echidnaHermesDrachmaAddressCannotChange(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    echidnaHermesDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    echidnaHermesOlympusAddressCannotChange(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    echidnaHermesOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    echidnaMarketDrachmaAddressCannotChange(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    echidnaMarketDrachmaAddressIsNotZero(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    echidnaMarketOlympusAddressCannotChange(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    echidnaMarketOlympusAddressIsNotZero(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hermes(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    market(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    olympus(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
