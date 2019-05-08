//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { fromJS } from 'immutable'
import _ from 'lodash'

import containerNormalizer from './containerNormalizer'

//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const normalizedContainers = containerNormalizer(_.sortBy(initialData.containers, ['name']))
const initialState = fromJS({
  containers: normalizedContainers.entities.containers,
  containerIds: normalizedContainers.result
})

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const containerReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'CREATE_CONTAINER': {
      const {
        newContainerId,
        newContainer
      } = action
      return state.setIn(['containers', newContainerId], newContainer)
                  .setIn(['containerIds', state.get('containerIds').size], newContainerId)
    }

    case 'DELETE_CONTAINER':  {
      const {
        containerId
      } = action
      return state.deleteIn(['containers', containerId])
                  .deleteIn(['containerIds', state.get('containerIds').findIndex(container => container === containerId)])
    }

    case 'UPDATE_CONTAINER':  {
      const {
        containerId,
        nextContainer
      } = action
      const container = state.getIn(['containers', containerId])
      return state.setIn(['containers', containerId], container.merge(fromJS(nextContainer)))
    }

    case 'UPDATE_CONTAINER_ID':  {
      const {
        containerId,
        nextContainerId
      } = action
      const container = state.getIn(['containers', containerId]).set('id', nextContainerId)
      const nextState = state.setIn(['containers', nextContainerId], container)
                              .deleteIn(['containers', containerId])
                              .setIn(['containerIds', state.get('containerIds').size], nextContainerId)
                              .deleteIn(['containerIds', state.get('containerIds').findIndex(container => container === containerId)])
      return nextState
    }

    default:
      return state
  }
}

export default containerReducers