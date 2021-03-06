import { createSelector } from 'reselect'
import { map, addIndex, indexBy, prop, mapObjIndexed, slice, find, isNil, merge, isEmpty, filter, complement } from 'ramda'

import getSortedByMinPriceSpecsByProduct from '../../supply/getters/getSortedByMinPriceSpecsByProduct'
import getOrderIntentsByOrderAgentProductPrice from './getOrderIntentsByOrderAgentProductPrice'

const mapIndexed = addIndex(map)
const indexByPriceSpecId = indexBy(prop('priceSpecId'))

export default createSelector(
  getOrderIntentsByOrderAgentProductPrice,
  getSortedByMinPriceSpecsByProduct,
  (orderIntents, priceSpecs) => {
    return map(map(mapObjIndexed((intents, productId) => {
      // intents are by priceSpecId
      // TODO: IK: i'm not sure why this guard logic is here, should always be priceSpecs for any productId? needs testing before removal though
      const allPriceSpecsForProduct = priceSpecs[productId] || {}
      if (isEmpty(allPriceSpecsForProduct)) return {}
      // now, for each priceSpec in allPriceSpecsForProduct, we want an intent
      // map over priceSpecs and return appropriate intent (highest minimum intent)
      // map returns a list, so indexByPriceSpecId as final step
      const intentsAtEachPriceSpec = mapIndexed((priceSpec, i, arr) => {
        const { id } = priceSpec
        // figure out ramda if else stuff later
        if (intents[id]) {
          return intents[id]
        }
        const nextPriceSpecs = slice(i, arr.length, arr)
        const nextBestPriceSpec = find((ps) => intents[ps.id], nextPriceSpecs)

        if (isNil(nextBestPriceSpec)) return {}
        // consider omitting the intent id, as it doesn't make sense when same intent id is across multiple priceSpecs
        return merge(intents[nextBestPriceSpec.id], { priceSpecId: id })
      }, allPriceSpecsForProduct)
      // remove all empty objects (generated if isNil(nextBestPriceSpec) above)
      const onlyValidIntentsAtEachPriceSpec = filter(complement(isEmpty), intentsAtEachPriceSpec)

      return indexByPriceSpecId(onlyValidIntentsAtEachPriceSpec)
    })), orderIntents)
  }
)
