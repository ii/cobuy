import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getActiveParentTaskPlans from '../../tasks/getters/getActiveParentTaskPlans'

const getDashboardProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  taskPlans: getActiveParentTaskPlans
})

export default getDashboardProps