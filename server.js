const services = [
  require('dogstack-agents/service'),
  require('./tokens/services/tokens'),
  require('./tokens/services/tokenConsumes'),
  require('./tasks/services/plans'),
  require('./tasks/services/works'),
  require('./ordering/services/orders'),
  require('./credentials/services/credentials'),
  require('./agents/services/agents'),
  require('./profiles/services/profiles'),
  require('./relationships/services/relationships'),
  require('./ordering/services/orderIntents'),
  require('./ordering/services/orderPlans'),
  require('./notifications/services/mailer'),
  require('./supply/services/products'),
  require('./supply/services/priceSpecs'),
  require('./resources/services/resourceTypes')
]

export default {
  services
}
