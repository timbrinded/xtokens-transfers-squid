import { toHex, decodeHex } from '@subsquid/substrate-processor'
import assert from 'assert'
import { XTokensSelfLocationConstant } from './types/constants'
import { AssetRegistryAssetMetadatasStorage, AssetRegistryLocationToCurrencyIdsStorage } from './types/storage'
import { BlockContext, Call, ChainContext } from './types/support'

export function getDestination(value: any) {
    switch (value.__kind) {
        case 'V0':
            return getDestinationFromLocation(value.value)
        case 'V1':
            return getDestinationFromLocation(value.value.interior)
        default:
            throw new Error(`Unsupported destination version: ${value.__kind}`)
    }
}

function getDestinationFromLocation(value: any): { id: string; paraId?: number } {
    switch (value.__kind) {
        case 'X1':
            return {
                id: getAccountId(value.value),
                paraId: undefined,
            }
        case 'X2':
            return {
                id: getAccountId(value.value[1]),
                paraId: getParachainId(value.value[0]),
            }
        default:
            throw new Error(`Unsupported location variant: ${value.__kind}`)
    }
}

function getAccountId(value: any): string {
    switch (value.__kind) {
        case 'AccountId32':
            return toHex(value.id)
        case 'AccountKey20':
            return toHex(value.key)
        default:
            throw new Error(`Unsupported account id variant: ${value.__kind}`)
    }
}

function getParachainId(value: any): number | undefined {
    switch (value.__kind) {
        case 'Parachain':
            return value.value
        case 'Parent':
            return undefined
        default:
            throw new Error(`Unsupported parachain id variant: ${value.__kind}`)
    }
}

interface AssetMetadatasStorageData {
    name: Uint8Array
    symbol: Uint8Array
    decimals: number
    minimalBalance: bigint
}

async function getAssetMetadatasStorageData(
    ctx: BlockContext,
    key: any
): Promise<AssetMetadatasStorageData | undefined> {
    const storage = new AssetRegistryAssetMetadatasStorage(ctx)

    if (!storage.isExists) return undefined

    if (storage.isV2011) {
        if (typeof key.value !== 'number') return undefined
        return await storage.getAsV2011(key.value)
    } else if (storage.isV2020) {
        if (key.__kind === 'NativeAssetId') return undefined
        return await storage.getAsV2020(key)
    } else if (storage.isV2042) {
        return await storage.getAsV2042(key)
    } else if (storage.isV2080) {
        return await storage.getAsV2080(key)
    } else {
        throw new Error()
    }
}


interface AssetMetadata {
    name: string
    symbol: string
    decimals: number
    minimalBalance: bigint
}

export async function getAssetMetadatas(ctx: BlockContext, currency: Currency): Promise<AssetMetadata | undefined> {
    let key: any
    switch (currency.__kind) {
        case 'Erc20':
            key = {
                __kind: 'Erc20',
                value: currency.value,
            }
            break
        case 'ForeignAsset':
            key = {
                __kind: 'ForeignAssetId',
                value: currency.value,
            }
            break
        case 'StableAsset':
            key = {
                __kind: 'StableAssetId',
                value: currency.value,
            }
            break
        case 'Token':
            key = {
                __kind: 'NativeAssetId',
                value: {
                    __kind: 'Token',
                    value: currency.value,
                },
            }
            break
        case 'LiquidCrowdloan':
            key = {
                __kind: 'NativeAssetId',
                value: {
                    __kind: 'LiquidCrowdloan',
                    value: currency.value,
                },
            }
    }

    const data = await getAssetMetadatasStorageData(ctx, key)
    if (!data) return undefined

    return {
        name: Buffer.from(data.name).toString('ascii'),
        symbol: Buffer.from(data.symbol).toString('ascii'),
        decimals: data.decimals,
        minimalBalance: data.minimalBalance,
    }
}

export type Currency =
    | {
          __kind: 'Erc20'
          value: Uint8Array
      }
    | {
          __kind: 'StableAsset'
          value: number
      }
    | {
          __kind: 'ForeignAsset'
          value: number
      }
    | {
          __kind: 'Token'
          value: { __kind: string }
      }
    | {
          __kind: 'LiquidCrowdloan'
          value: number
      }

export type Token = { symbol: string; decimals: number }

const nativeTokens: Map<string, Token & { num: number }> = new Map()
    .set('ACA', { symbol: 'ACA', decimals: 12, num: 128 })
    .set('AUSD', { symbol: 'AUSD', decimals: 12, num: 129 })
    .set('DOT', { symbol: 'DOT', decimals: 10, num: 130 })
    .set('LDOT', { symbol: 'LDOT', decimals: 10, num: 131 })

export async function getTokenFromCurrency(ctx: BlockContext, currency: Currency): Promise<Token> {
    let token: Token | undefined
    switch (currency.__kind) {
        case 'Token':
            token = nativeTokens.get(currency.value.__kind)
            if (token) break
        default:
            token = await getAssetMetadatas(ctx, currency)
    }
    assert(token != null)
    return token
}

type Location = { parents: number; interior: any }

// ref https://github.com/AcalaNetwork/Acala/blob/7a2c3a50b36cb58fad8bc63175c7ff1e77479509/runtime/karura/src/xcm_config.rs#L371
async function getCurrencyFromLocation(ctx: BlockContext, location: Location): Promise<Currency> {
    let currency: Currency | undefined
    switch (location.parents) {
        case 0:
            switch (location.interior.__kind) {
                case 'X1':
                    switch (location.interior.value[0].__kind) {
                        case 'GeneralKey': {
                            currency = getCurrencyFromKey(location.interior.value[0].value)
                            break
                        }
                        default:
                            throw new Error()
                    }
                    break
            }
            break
        case 1:
            switch (location.interior.__kind) {
                case 'Here':
                    return createToken('DOT')
                case 'X2':
                    switch (location.interior.value[0].__kind) {
                        case 'Parachain': {
                            const id = location.interior.value[0].value

                            if (location.interior.value[1].__kind !== 'GeneralKey') break

                            const key = location.interior.value[1].value
                            currency = parachains[id]?.tokens[toHex(key)]
                            if (currency) break

                            const paraId = getSelfParachainId(ctx)
                            if (id !== paraId) break
                            currency = getCurrencyFromKey(key)
                            break
                        }
                    }
                    break
                case 'X1':
                    switch (location.interior.value.__kind) {
                        case 'Parachain': {
                            const id = location.interior.value.value
                            currency = parachains[id]?.tokens[toHex(Buffer.from([0, 0]))]
                            break
                        }
                    }
                    break
            }
            break
    }

    if (currency == null) currency = await getLocationToCurrencyIdStorage(ctx, location)
    assert(currency != null)

    return currency
}

function getLocationFromAssetId(value: any): Location {
    switch (value.__kind) {
        case 'Concrete':
            return value.value
        case 'Abstract':
        default:
            throw new Error(`Unsupported AssetId variant ${value.__kind}`)
    }
}

function getAmountFromFungibility(value: any): bigint {
    switch (value.__kind) {
        case 'Fungible':
            return value.value
        case 'NoneFungible':
        default:
            throw new Error(`Unsupported faungibility variant ${value.__kind}`)
    }
}

export async function getAsset(ctx: BlockContext, value: any): Promise<{ currency: Currency; amount: bigint }> {
    const version = value.__kind

    switch (version) {
        case 'V0': {
            throw new Error(`Missing implementation for asset version ${version}`)
        }
        case 'V1': {
            const location = getLocationFromAssetId(value.value.id)
            const currency = await getCurrencyFromLocation(ctx, location)

            const amount = getAmountFromFungibility(value.value.fun)

            return { currency, amount }
        }
        default:
            throw new Error(`Unsupported asset version ${version}`)
    }
}

function createToken(symbol: string): Currency & { __kind: 'Token' } {
    return {
        __kind: 'Token',
        value: { __kind: symbol },
    }
}

function getCurrencyFromKey(key: Uint8Array): Currency | undefined {
    const num = Buffer.from(key).readUintBE(0, 2)
    const token = [...nativeTokens.values()].find((t) => t.num === num)
    return token ? createToken(token.symbol) : undefined
}

// ref https://github.com/AcalaNetwork/Acala/blob/7a2c3a50b36cb58fad8bc63175c7ff1e77479509/runtime/karura/src/constants.rs#L94
const parachains: Record<number, { tokens: Record<string, Currency> }> = {
    //Moonbeam
    2004: {tokens:{}},
    //Interlay
    2032: {tokens:{}},
    //Astar
    2006: {tokens:{}},
    //Parallel
    2012: {tokens:{}},

    // bifrost
    2001: {
        tokens: {
            [toHex(Buffer.from([0, 1]))]: createToken('BNC'),
            [toHex(Buffer.from([4, 4]))]: createToken('VSKSM'),
        },
    },
    // kintsugi
    2092: {
        tokens: {
            [toHex(Buffer.from([0, 11]))]: createToken('KBTC'),
            [toHex(Buffer.from([0, 12]))]: createToken('KINT'),
        },
    },
    // statemine
    1000: {
        tokens: {},
    },
}

function getSelfLocationConst(ctx: ChainContext): { __kind: string; value: any } | undefined {
    const data = new XTokensSelfLocationConstant(ctx)
    if (!data) return undefined


    if (data.isExists) {
        return {
            __kind: 'V1',
            value: data.asV2000,
        }
    } else {
        throw new Error()
    }
}

function getSelfParachainId(ctx: ChainContext) {
    const selfLocation = getSelfLocationConst(ctx)
    if (!selfLocation) return undefined

    switch (selfLocation.__kind) {
        case 'V0': {
            const location = selfLocation.value
            if (location.__kind === 'X1') {
                return getParachainId(location.value)
            }
            break
        }
        case 'V1': {
            const location = selfLocation.value.interior
            if (location.__kind === 'X1') {
                return getParachainId(location.value)
            }
            break
        }
    }

    return undefined
}

async function getLocationToCurrencyIdStorage(ctx: BlockContext, location: Location): Promise<Currency | undefined> {
    const data = new AssetRegistryLocationToCurrencyIdsStorage(ctx)
    if (!data) return undefined

    return await ctx._chain.getStorage(ctx.block.hash, 'AssetRegistry', 'LocationToCurrencyIds', location)
}
