import { BatchContext, EventHandlerContext, SubstrateBlock, SubstrateEvent } from '@subsquid/substrate-processor'
import {
    XTokensTransferredEvent,
    XTokensTransferredMultiAssetEvent,
    XTokensTransferredMultiAssetsEvent,
    XTokensTransferredMultiAssetWithFeeEvent,
    XTokensTransferredMultiCurrenciesEvent,
    XTokensTransferredWithFeeEvent,
} from './types/events'
import { ChainContext, Event, BlockContext } from './types/support'
import * as ss58 from '@subsquid/ss58'
import { getAsset, getDestination, getTokenFromCurrency } from './utils'
import { Store } from '@subsquid/typeorm-store'
import assert from 'assert'

export interface XcmTransferData {
    id: string
    blockNumber: number
    timestamp: Date
    extrinsicHash?: string
    from: string
    to: {
        paraId?: number
        id: string
    }
    assets: {
        symbol: string
        amount: bigint
    }[]
    fee?: bigint
}

export type TransferredEventData = {
    sender: Uint8Array
    currencyId: any
    amount: bigint
    dest: any
}

export function getTransferredEventData(ctx: ChainContext, event: Event): TransferredEventData {
    const e = new XTokensTransferredEvent(ctx, event)


        const { sender, currencyId, amount, dest } = ctx._chain.decodeEvent(event)
        return {
            sender,
            currencyId,
            amount,
            dest: {
                __kind: 'V1',
                value: dest,
            },
        }

}

export async function parseTransferredEvent(
    ctx: BatchContext<Store, unknown>,
    block: SubstrateBlock,
    event: SubstrateEvent
): Promise<XcmTransferData | undefined> {
    const data = getTransferredEventData(ctx, event)

    try {
        const dest = getDestination(data.dest)
        const token = await getTokenFromCurrency({ ...ctx, block }, data.currencyId)

        return {
            id: event.id,
            blockNumber: block.height,
            timestamp: new Date(block.timestamp),
            extrinsicHash: event.extrinsic?.hash,
            from: ss58.codec('acala').encode(data.sender),
            to: dest,
            assets: [
                {
                    symbol: token?.symbol,
                    amount: data.amount,
                },
            ],
            fee: event.extrinsic?.fee || 0n,
        }
    } catch (e: any) {
        ctx.log.warn({ block: block.height, extrinsic: event.extrinsic?.hash }, e.stack)
        return undefined
    }
}

export type TransferredWithFeeEventData = {
    sender: Uint8Array
    currencyId: any
    amount: bigint
    dest: any
}

export function getTransferredWithFeeEventData(ctx: ChainContext, event: Event): TransferredWithFeeEventData {
    const e = new XTokensTransferredWithFeeEvent(ctx, event)

    const { sender, currencyId, amount, dest } = ctx._chain.decodeEvent(event)
    return {
        sender,
        currencyId,
        amount,
        dest: {
            __kind: 'V1',
            value: dest,
        },
    }
}

export async function parseTransferredWithFeeEvent(
    ctx: BatchContext<Store, unknown>,
    block: SubstrateBlock,
    event: SubstrateEvent
): Promise<XcmTransferData | undefined> {
    const data = getTransferredEventData(ctx, event)

    try {
        const dest = getDestination(data.dest)
        const token = await getTokenFromCurrency({ ...ctx, block }, data.currencyId)

        return {
            id: event.id,
            blockNumber: block.height,
            timestamp: new Date(block.timestamp),
            extrinsicHash: event.extrinsic?.hash,
            from: ss58.codec('acala').encode(data.sender),
            to: dest,
            assets: [
                {
                    symbol: token?.symbol,
                    amount: data.amount,
                },
            ],
            fee: event.extrinsic?.fee || 0n,
        }
    } catch (e: any) {
        ctx.log.warn({ block: block.height, extrinsic: event.extrinsic?.hash }, e.stack)
        return undefined
    }
}

export type TransferredMultiAssetEventData = {
    sender: Uint8Array
    asset: any
    dest: any
}

export function getTransferredMultiAssetEventData(ctx: ChainContext, event: Event): TransferredMultiAssetEventData {
    const e = new XTokensTransferredMultiAssetEvent(ctx, event)


        const { sender, asset, dest } = ctx._chain.decodeEvent(event)
        return {
            sender,
            asset: {
                __kind: 'V1',
                value: asset,
            },
            dest: {
                __kind: 'V1',
                value: dest,
            },
        }
}

export async function parseTransferredMultiAssetEvent(
    ctx: BatchContext<Store, unknown>,
    block: SubstrateBlock,
    event: SubstrateEvent
): Promise<XcmTransferData | undefined> {
    const data = getTransferredMultiAssetEventData(ctx, event)

    try {
        const dest = getDestination(data.dest)
        const asset = await getAsset({ ...ctx, block }, data.asset)
        const token = await getTokenFromCurrency({ ...ctx, block }, asset.currency)

        return {
            id: event.id,
            blockNumber: block.height,
            timestamp: new Date(block.timestamp),
            extrinsicHash: event.extrinsic?.hash,
            from: ss58.codec('acala').encode(data.sender),
            to: dest,
            assets: [
                {
                    symbol: token.symbol,
                    amount: asset.amount,
                },
            ],
            fee: event.extrinsic?.fee || 0n,
        }
    } catch (e: any) {
        ctx.log.warn({ block: block.height, extrinsic: event.extrinsic?.hash }, e.stack)
        return undefined
    }
}

export type TransferredMultiAssetWithFeeEventData = {
    sender: Uint8Array
    asset: any
    dest: any
}

export function getTransferredMultiAssetWithFeeEventData(
    ctx: ChainContext,
    event: Event
): TransferredMultiAssetEventData {
    const e = new XTokensTransferredMultiAssetWithFeeEvent(ctx, event)

    const { sender, asset, dest } = ctx._chain.decodeEvent(event)
    return {
        sender,
        asset: {
            __kind: 'V1',
            value: asset,
        },
        dest: {
            __kind: 'V1',
            value: dest,
        },
    }
}

export async function parseTransferredMultiAssetWithFeeEvent(
    ctx: BatchContext<Store, unknown>,
    block: SubstrateBlock,
    event: SubstrateEvent
): Promise<XcmTransferData | undefined> {
    const data = getTransferredMultiAssetWithFeeEventData(ctx, event)

    try {
        const dest = getDestination(data.dest)
        const asset = await getAsset({ ...ctx, block }, data.asset)
        const token = await getTokenFromCurrency({ ...ctx, block }, asset.currency)

        return {
            id: event.id,
            blockNumber: block.height,
            timestamp: new Date(block.timestamp),
            extrinsicHash: event.extrinsic?.hash,
            from: ss58.codec('acala').encode(data.sender),
            to: dest,
            assets: [
                {
                    symbol: token.symbol,
                    amount: asset.amount,
                },
            ],
            fee: event.extrinsic?.fee || 0n,
        }
    } catch (e: any) {
        ctx.log.warn({ block: block.height, extrinsic: event.extrinsic?.hash }, e.stack)
        return undefined
    }
}

export type TransferredMultiCurrenciesEventData = {
    sender: Uint8Array
    currencies: {
        currencyId: any
        amount: bigint
    }[]
    dest: any
}

export function getTransferredMultiCurrenciesEventData(
    ctx: ChainContext,
    event: Event
): TransferredMultiCurrenciesEventData {
    const e = new XTokensTransferredMultiCurrenciesEvent(ctx, event)

    const { sender, currencies, dest } = e.asV2032
    return {
        sender,
        currencies: currencies.map(([currencyId, amount]: [any, bigint]) => ({ currencyId, amount })),
        dest: {
            __kind: 'V1',
            value: dest,
        },
    }
}

export async function parseTransferredMultiCurrenciesEvent(
    ctx: BatchContext<Store, unknown>,
    block: SubstrateBlock,
    event: SubstrateEvent
): Promise<XcmTransferData | undefined> {
    const data = getTransferredMultiCurrenciesEventData(ctx, event)

    try {
        const dest = getDestination(data.dest)
        const assets: { symbol: string; amount: bigint }[] = []
        for (const assetData of data.currencies) {
            const token = await getTokenFromCurrency({ ...ctx, block }, assetData.currencyId)
            assets.push({ symbol: token.symbol, amount: assetData.amount })
        }

        return {
            id: event.id,
            blockNumber: block.height,
            timestamp: new Date(block.timestamp),
            extrinsicHash: event.extrinsic?.hash,
            from: ss58.codec('acala').encode(data.sender),
            to: dest,
            assets,
            fee: event.extrinsic?.fee || 0n,
        }
    } catch (e: any) {
        ctx.log.warn({ block: block.height, extrinsic: event.extrinsic?.hash }, e.stack)
        return undefined
    }
}

export function getTransferredMultiAssetsData(ctx: ChainContext, event: Event) {
    const e = new XTokensTransferredMultiAssetsEvent(ctx, event)

    if (e.isV2032 || e.isV2040) {
        const { sender, assets, dest } = ctx._chain.decodeEvent(event)
        return {
            sender,
            assets: assets.map((a: any) => ({
                __kind: 'V1',
                value: a,
            })),
            dest: {
                __kind: 'V1',
                value: dest,
            },
        }
    } else {
        throw new Error()
    }
}

export async function parseTransferredMultiAssetsEvent(
    ctx: BatchContext<Store, unknown>,
    block: SubstrateBlock,
    event: SubstrateEvent
): Promise<XcmTransferData | undefined> {
    const data = getTransferredMultiAssetsData(ctx, event)

    try {
        const dest = getDestination(data.dest)

        const assets: { symbol: string; amount: bigint }[] = []
        for (const assetData of data.assets) {
            const asset = await getAsset({ ...ctx, block }, assetData)
            const token = await getTokenFromCurrency({ ...ctx, block }, asset.currency)
            assets.push({ symbol: token.symbol, amount: asset.amount })
        }

        return {
            id: event.id,
            blockNumber: block.height,
            timestamp: new Date(block.timestamp),
            extrinsicHash: event.extrinsic?.hash,
            from: ss58.codec('acala').encode(data.sender),
            to: dest,
            assets,
            fee: event.extrinsic?.fee || 0n,
        }
    } catch (e: any) {
        ctx.log.warn({ block: block.height, extrinsic: event.extrinsic?.hash }, e.stack)
        return undefined
    }
}
