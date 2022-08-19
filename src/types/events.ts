import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v2000 from './v2000'
import * as v2011 from './v2011'
import * as v2020 from './v2020'
import * as v2022 from './v2022'
import * as v2032 from './v2032'
import * as v2040 from './v2040'

export class BalancesTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Transfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get isV2000(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get asV2000(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV2000)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV2011(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV2011(): {from: Uint8Array, to: Uint8Array, amount: bigint} {
    assert(this.isV2011)
    return this._chain.decodeEvent(this.event)
  }
}

export class XTokensTransferredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'XTokens.Transferred')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transferred. \[sender, currency_id, amount, dest\]
   */
  get isV2000(): boolean {
    return this._chain.getEventHash('XTokens.Transferred') === '0e7cdeffa5bb4181dda583b17b437344b32253a5df5b08d6ced1ce3632a5f647'
  }

  /**
   * Transferred. \[sender, currency_id, amount, dest\]
   */
  get asV2000(): [Uint8Array, v2000.CurrencyId, bigint, v2000.V1MultiLocation] {
    assert(this.isV2000)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transferred. \[sender, currency_id, amount, dest\]
   */
  get isV2011(): boolean {
    return this._chain.getEventHash('XTokens.Transferred') === 'cf1efd7b0f05b0f52c9269c41f4551b6021fc3a8472f90fe60d08d4b3fa4f720'
  }

  /**
   * Transferred. \[sender, currency_id, amount, dest\]
   */
  get asV2011(): [Uint8Array, v2011.CurrencyId, bigint, v2011.V1MultiLocation] {
    assert(this.isV2011)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transferred.
   */
  get isV2020(): boolean {
    return this._chain.getEventHash('XTokens.Transferred') === '99b70efe6a0e14876ffba5edb5b66794f3c5b511c962035cc3d48463ce12ccc2'
  }

  /**
   * Transferred.
   */
  get asV2020(): {sender: Uint8Array, currencyId: v2020.CurrencyId, amount: bigint, dest: v2020.V1MultiLocation} {
    assert(this.isV2020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transferred.
   */
  get isV2022(): boolean {
    return this._chain.getEventHash('XTokens.Transferred') === 'f72b1c7bb31c8d435f578232955e9167f7235715e0822b997541bf723bdafa2f'
  }

  /**
   * Transferred.
   */
  get asV2022(): {sender: Uint8Array, currencyId: v2022.CurrencyId, amount: bigint, dest: v2022.V1MultiLocation} {
    assert(this.isV2022)
    return this._chain.decodeEvent(this.event)
  }
}

export class XTokensTransferredMultiAssetEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'XTokens.TransferredMultiAsset')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transferred `MultiAsset`. \[sender, asset, dest\]
   */
  get isV2000(): boolean {
    return this._chain.getEventHash('XTokens.TransferredMultiAsset') === 'c576be07d7337c6d483d9cb4dcd92edba9b7278d34d38dfbe185a6ffdeac90ad'
  }

  /**
   * Transferred `MultiAsset`. \[sender, asset, dest\]
   */
  get asV2000(): [Uint8Array, v2000.V1MultiAsset, v2000.V1MultiLocation] {
    assert(this.isV2000)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transferred `MultiAsset`.
   */
  get isV2020(): boolean {
    return this._chain.getEventHash('XTokens.TransferredMultiAsset') === '7fec273aa0ae147760c7dd1940b67deb436b25b9e2d4c7c75150b174e815408b'
  }

  /**
   * Transferred `MultiAsset`.
   */
  get asV2020(): {sender: Uint8Array, asset: v2020.V1MultiAsset, dest: v2020.V1MultiLocation} {
    assert(this.isV2020)
    return this._chain.decodeEvent(this.event)
  }
}

export class XTokensTransferredMultiAssetWithFeeEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'XTokens.TransferredMultiAssetWithFee')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transferred `MultiAsset` with fee. \[sender, asset, fee, dest\]
   */
  get isV2011(): boolean {
    return this._chain.getEventHash('XTokens.TransferredMultiAssetWithFee') === 'bac4b8d0c2b1228f18e595bb7007474bf1969f0a2de83bc73a545831e561ed36'
  }

  /**
   * Transferred `MultiAsset` with fee. \[sender, asset, fee, dest\]
   */
  get asV2011(): [Uint8Array, v2011.V1MultiAsset, v2011.V1MultiAsset, v2011.V1MultiLocation] {
    assert(this.isV2011)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV2020(): boolean {
    return this._chain.getEventHash('XTokens.TransferredMultiAssetWithFee') === 'cba4a5ec13032868bc74df82888767ea7fd34969b190ec1e6086219a80e5ee72'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV2020(): {sender: Uint8Array, asset: v2020.V1MultiAsset, fee: v2020.V1MultiAsset, dest: v2020.V1MultiLocation} {
    assert(this.isV2020)
    return this._chain.decodeEvent(this.event)
  }
}

export class XTokensTransferredMultiAssetsEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'XTokens.TransferredMultiAssets')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV2032(): boolean {
    return this._chain.getEventHash('XTokens.TransferredMultiAssets') === 'f7bab399e6ba944b4e125eae381fe361968f8e894d499e45a921bf53ae4632d8'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV2032(): {sender: Uint8Array, assets: v2032.V1MultiAsset[], dest: v2032.V1MultiLocation} {
    assert(this.isV2032)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV2040(): boolean {
    return this._chain.getEventHash('XTokens.TransferredMultiAssets') === '19a61ff727b39e06bdac9248dc278a5be6292a6af670958a6338915a3e003249'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV2040(): {sender: Uint8Array, assets: v2040.V1MultiAsset[], fee: v2040.V1MultiAsset, dest: v2040.V1MultiLocation} {
    assert(this.isV2040)
    return this._chain.decodeEvent(this.event)
  }
}

export class XTokensTransferredMultiCurrenciesEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'XTokens.TransferredMultiCurrencies')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV2032(): boolean {
    return this._chain.getEventHash('XTokens.TransferredMultiCurrencies') === '212cfbe66491a1e9be9532ad18c31726838acceb3bd622d0c48838c174e49b1e'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV2032(): {sender: Uint8Array, currencies: [v2032.CurrencyId, bigint][], dest: v2032.V1MultiLocation} {
    assert(this.isV2032)
    return this._chain.decodeEvent(this.event)
  }
}

export class XTokensTransferredWithFeeEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'XTokens.TransferredWithFee')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transferred with fee. \[sender, currency_id, amount, fee, dest\]
   */
  get isV2011(): boolean {
    return this._chain.getEventHash('XTokens.TransferredWithFee') === 'b153db804dcd24161ad41c4a91c3ebe5a4b1df37516c8288681b83a80683b3a4'
  }

  /**
   * Transferred with fee. \[sender, currency_id, amount, fee, dest\]
   */
  get asV2011(): [Uint8Array, v2011.CurrencyId, bigint, bigint, v2011.V1MultiLocation] {
    assert(this.isV2011)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transferred with fee.
   */
  get isV2020(): boolean {
    return this._chain.getEventHash('XTokens.TransferredWithFee') === '09ad118ca7d0260dd9d51cd6ad1149db02cadbea4ad06f9db1496086308be316'
  }

  /**
   * Transferred with fee.
   */
  get asV2020(): {sender: Uint8Array, currencyId: v2020.CurrencyId, amount: bigint, fee: bigint, dest: v2020.V1MultiLocation} {
    assert(this.isV2020)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Transferred with fee.
   */
  get isV2022(): boolean {
    return this._chain.getEventHash('XTokens.TransferredWithFee') === '7bfa9afc00742f16d9a3f6ecd20d3f3955b975810f52fe92ed3f61b1fcef9925'
  }

  /**
   * Transferred with fee.
   */
  get asV2022(): {sender: Uint8Array, currencyId: v2022.CurrencyId, amount: bigint, fee: bigint, dest: v2022.V1MultiLocation} {
    assert(this.isV2022)
    return this._chain.decodeEvent(this.event)
  }
}
