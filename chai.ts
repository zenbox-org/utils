import BigNumber from 'bignumber.js'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiBigNumber from 'chai-bignumber'
import chaiSubset from 'chai-subset'
import chaiThings from 'chai-things'

chai.use(chaiAsPromised)
chai.use(chaiThings)
chai.use(chaiSubset)
chai.use(chaiBigNumber(BigNumber))

export const expect = chai.expect
