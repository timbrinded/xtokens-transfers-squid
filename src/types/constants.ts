import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v1001 from './v1001'
import * as v1014 from './v1014'
import * as v1019 from './v1019'

export class XTokensSelfLocationConstant {
  private readonly _chain: Chain

  constructor(ctx: ChainContext) {
    this._chain = ctx._chain
  }

  /**
   *  Self chain location.
   */
  get isV1001() {
    return this._chain.getConstantTypeHash('XTokens', 'SelfLocation') === '098ead8630dc0c09324dbe4c11d30748644876c414dded5608a81a3738db7f6d'
  }

  /**
   *  Self chain location.
   */
  get asV1001(): v1001.MultiLocation {
    assert(this.isV1001)
    return this._chain.getConstant('XTokens', 'SelfLocation')
  }

  /**
   *  Self chain location.
   */
  get isV1014() {
    return this._chain.getConstantTypeHash('XTokens', 'SelfLocation') === 'b982b4bc194b140c4ea0aa95ce463d3f1ca28967e1e290213dbd7decf0ec6d56'
  }

  /**
   *  Self chain location.
   */
  get asV1014(): v1014.MultiLocation {
    assert(this.isV1014)
    return this._chain.getConstant('XTokens', 'SelfLocation')
  }

  /**
   *  Self chain location.
   */
  get isV1019() {
    return this._chain.getConstantTypeHash('XTokens', 'SelfLocation') === '596335720c12dda4acafdb8b7ed539c4b47f1563ed97456e9a3fcd771714568c'
  }

  /**
   *  Self chain location.
   */
  get asV1019(): v1019.V1MultiLocation {
    assert(this.isV1019)
    return this._chain.getConstant('XTokens', 'SelfLocation')
  }

  /**
   * Checks whether the constant is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getConstantTypeHash('XTokens', 'SelfLocation') != null
  }
}
