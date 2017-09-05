import { combineEpics } from 'redux-observable'

import { epic as agents } from 'dogstack-agents'
import { epic as taskPlans } from './tasks/dux/plans'
import { epic as taskWorks } from './tasks/dux/works'
import { epic as orders } from './ordering/dux/orders'
import { epic as products } from './supply/dux/products'
import { epic as priceSpecs } from './supply/dux/priceSpecs'
import { epic as resourceTypes } from './resources/dux/resourceTypes'

export default combineEpics(
  agents,
  orders,
  taskPlans,
  taskWorks,
  products,
  priceSpecs,
  resourceTypes
)
