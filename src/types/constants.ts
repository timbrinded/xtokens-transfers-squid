import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v2000 from './v2000'

export class XTokensSelfLocationConstant {
  private readonly _chain: Chain

  constructor(ctx: ChainContext) {
    this._chain = ctx._chain
  }

  /**
   *  Self chain location.
   */
  get isV2000() {
    return this._chain.getConstantTypeHash('XTokens', 'SelfLocation') === '596335720c12dda4acafdb8b7ed539c4b47f1563ed97456e9a3fcd771714568c'
  }

  /**
   *  Self chain location.
   */
  get asV2000(): v2000.V1MultiLocation {
    assert(this.isV2000)
    return this._chain.getConstant('XTokens', 'SelfLocation')
  }

  /**
   * Checks whether the constant is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getConstantTypeHash('XTokens', 'SelfLocation') != null
  }
}
