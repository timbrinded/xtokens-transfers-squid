import type {Result} from './support'

export type CurrencyId = CurrencyId_Token | CurrencyId_DEXShare | CurrencyId_ERC20 | CurrencyId_StableAssetPoolToken | CurrencyId_LiquidCroadloan | CurrencyId_ForeignAsset

export interface CurrencyId_Token {
  __kind: 'Token'
  value: TokenSymbol
}

export interface CurrencyId_DEXShare {
  __kind: 'DEXShare'
  value: [DexShare, DexShare]
}

export interface CurrencyId_ERC20 {
  __kind: 'ERC20'
  value: Uint8Array
}

export interface CurrencyId_StableAssetPoolToken {
  __kind: 'StableAssetPoolToken'
  value: number
}

export interface CurrencyId_LiquidCroadloan {
  __kind: 'LiquidCroadloan'
  value: number
}

export interface CurrencyId_ForeignAsset {
  __kind: 'ForeignAsset'
  value: number
}

export interface MultiLocation {
  parents: number
  interior: JunctionsV1
}

export interface MultiAsset {
  id: XcmAssetId
  fungibility: FungibilityV1
}

export type TokenSymbol = TokenSymbol_ACA | TokenSymbol_AUSD | TokenSymbol_DOT | TokenSymbol_LDOT | TokenSymbol_RENBTC | TokenSymbol_CASH | TokenSymbol_KAR | TokenSymbol_KUSD | TokenSymbol_KSM | TokenSymbol_LKSM | TokenSymbol_BNC | TokenSymbol_VSKSM

export interface TokenSymbol_ACA {
  __kind: 'ACA'
}

export interface TokenSymbol_AUSD {
  __kind: 'AUSD'
}

export interface TokenSymbol_DOT {
  __kind: 'DOT'
}

export interface TokenSymbol_LDOT {
  __kind: 'LDOT'
}

export interface TokenSymbol_RENBTC {
  __kind: 'RENBTC'
}

export interface TokenSymbol_CASH {
  __kind: 'CASH'
}

export interface TokenSymbol_KAR {
  __kind: 'KAR'
}

export interface TokenSymbol_KUSD {
  __kind: 'KUSD'
}

export interface TokenSymbol_KSM {
  __kind: 'KSM'
}

export interface TokenSymbol_LKSM {
  __kind: 'LKSM'
}

export interface TokenSymbol_BNC {
  __kind: 'BNC'
}

export interface TokenSymbol_VSKSM {
  __kind: 'VSKSM'
}

export type DexShare = DexShare_Token | DexShare_Erc20

export interface DexShare_Token {
  __kind: 'Token'
  value: TokenSymbol
}

export interface DexShare_Erc20 {
  __kind: 'Erc20'
  value: Uint8Array
}

export type JunctionsV1 = JunctionsV1_Here | JunctionsV1_X1 | JunctionsV1_X2 | JunctionsV1_X3 | JunctionsV1_X4 | JunctionsV1_X5 | JunctionsV1_X6 | JunctionsV1_X7 | JunctionsV1_X8

export interface JunctionsV1_Here {
  __kind: 'Here'
  value: null
}

export interface JunctionsV1_X1 {
  __kind: 'X1'
  value: JunctionV1
}

export interface JunctionsV1_X2 {
  __kind: 'X2'
  value: [JunctionV1, JunctionV1]
}

export interface JunctionsV1_X3 {
  __kind: 'X3'
  value: [JunctionV1, JunctionV1, JunctionV1]
}

export interface JunctionsV1_X4 {
  __kind: 'X4'
  value: [JunctionV1, JunctionV1, JunctionV1, JunctionV1]
}

export interface JunctionsV1_X5 {
  __kind: 'X5'
  value: [JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1]
}

export interface JunctionsV1_X6 {
  __kind: 'X6'
  value: [JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1]
}

export interface JunctionsV1_X7 {
  __kind: 'X7'
  value: [JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1]
}

export interface JunctionsV1_X8 {
  __kind: 'X8'
  value: [JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1]
}

export type XcmAssetId = XcmAssetId_Concrete | XcmAssetId_Abstract

export interface XcmAssetId_Concrete {
  __kind: 'Concrete'
  value: MultiLocation
}

export interface XcmAssetId_Abstract {
  __kind: 'Abstract'
  value: Uint8Array
}

export type FungibilityV1 = FungibilityV1_Fungible | FungibilityV1_NonFungible

export interface FungibilityV1_Fungible {
  __kind: 'Fungible'
  value: bigint
}

export interface FungibilityV1_NonFungible {
  __kind: 'NonFungible'
  value: AssetInstanceV1
}

export type JunctionV1 = JunctionV1_Parachain | JunctionV1_AccountId32 | JunctionV1_AccountIndex64 | JunctionV1_AccountKey20 | JunctionV1_PalletInstance | JunctionV1_GeneralIndex | JunctionV1_GeneralKey | JunctionV1_OnlyChild | JunctionV1_Plurality

export interface JunctionV1_Parachain {
  __kind: 'Parachain'
  value: number
}

export interface JunctionV1_AccountId32 {
  __kind: 'AccountId32'
  network: NetworkId
  id: Uint8Array
}

export interface JunctionV1_AccountIndex64 {
  __kind: 'AccountIndex64'
  network: NetworkId
  index: bigint
}

export interface JunctionV1_AccountKey20 {
  __kind: 'AccountKey20'
  network: NetworkId
  key: Uint8Array
}

export interface JunctionV1_PalletInstance {
  __kind: 'PalletInstance'
  value: number
}

export interface JunctionV1_GeneralIndex {
  __kind: 'GeneralIndex'
  value: bigint
}

export interface JunctionV1_GeneralKey {
  __kind: 'GeneralKey'
  value: Uint8Array
}

export interface JunctionV1_OnlyChild {
  __kind: 'OnlyChild'
  value: null
}

export interface JunctionV1_Plurality {
  __kind: 'Plurality'
  id: BodyId
  part: BodyPart
}

export type AssetInstanceV1 = AssetInstanceV1_Undefined | AssetInstanceV1_Index | AssetInstanceV1_Array4 | AssetInstanceV1_Array8 | AssetInstanceV1_Array16 | AssetInstanceV1_Array32 | AssetInstanceV1_Blob

export interface AssetInstanceV1_Undefined {
  __kind: 'Undefined'
  value: null
}

export interface AssetInstanceV1_Index {
  __kind: 'Index'
  value: bigint
}

export interface AssetInstanceV1_Array4 {
  __kind: 'Array4'
  value: Uint8Array
}

export interface AssetInstanceV1_Array8 {
  __kind: 'Array8'
  value: Uint8Array
}

export interface AssetInstanceV1_Array16 {
  __kind: 'Array16'
  value: Uint8Array
}

export interface AssetInstanceV1_Array32 {
  __kind: 'Array32'
  value: Uint8Array
}

export interface AssetInstanceV1_Blob {
  __kind: 'Blob'
  value: Uint8Array
}

export type NetworkId = NetworkId_Any | NetworkId_Named | NetworkId_Polkadot | NetworkId_Kusama

export interface NetworkId_Any {
  __kind: 'Any'
  value: null
}

export interface NetworkId_Named {
  __kind: 'Named'
  value: Uint8Array
}

export interface NetworkId_Polkadot {
  __kind: 'Polkadot'
  value: null
}

export interface NetworkId_Kusama {
  __kind: 'Kusama'
  value: null
}

export type BodyId = BodyId_Unit | BodyId_Named | BodyId_Index | BodyId_Executive | BodyId_Technical | BodyId_Legislative | BodyId_Judicial

export interface BodyId_Unit {
  __kind: 'Unit'
  value: null
}

export interface BodyId_Named {
  __kind: 'Named'
  value: Uint8Array
}

export interface BodyId_Index {
  __kind: 'Index'
  value: number
}

export interface BodyId_Executive {
  __kind: 'Executive'
  value: null
}

export interface BodyId_Technical {
  __kind: 'Technical'
  value: null
}

export interface BodyId_Legislative {
  __kind: 'Legislative'
  value: null
}

export interface BodyId_Judicial {
  __kind: 'Judicial'
  value: null
}

export type BodyPart = BodyPart_Voice | BodyPart_Members | BodyPart_Fraction | BodyPart_AtLeastProportion | BodyPart_MoreThanProportion

export interface BodyPart_Voice {
  __kind: 'Voice'
  value: null
}

export interface BodyPart_Members {
  __kind: 'Members'
  value: number
}

export interface BodyPart_Fraction {
  __kind: 'Fraction'
  nom: number
  denom: number
}

export interface BodyPart_AtLeastProportion {
  __kind: 'AtLeastProportion'
  nom: number
  denom: number
}

export interface BodyPart_MoreThanProportion {
  __kind: 'MoreThanProportion'
  nom: number
  denom: number
}
