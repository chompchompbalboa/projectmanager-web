//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation } from '../../../_api'

import { 
  setStatus 
} from '../status/statusActions'

//-----------------------------------------------------------------------------
// Update Active Container Id
//-----------------------------------------------------------------------------
export const updateActiveContainerId = nextActiveContainerId => ({
  type: 'UPDATE_ACTIVE_CONTAINER_ID',
  nextActiveContainerId: nextActiveContainerId
})

//-----------------------------------------------------------------------------
// Update Active Modal
//-----------------------------------------------------------------------------
export const updateActiveModal = nextActiveModal => ({
  type: 'UPDATE_ACTIVE_MODAL',
  nextActiveModal: nextActiveModal
})

//-----------------------------------------------------------------------------
// Update Left Column Width
//-----------------------------------------------------------------------------
export const updateLeftColumnWidth = (nextLeftColumnWidth, isInitialLoad) => {
  return dispatch => {
    dispatch(updateLeftColumnWidthReducer(nextLeftColumnWidth))
    if (!isInitialLoad) {
      dispatch(updateLeftColumnWidthServer(nextLeftColumnWidth))
    }
  }
}

const updateLeftColumnWidthReducer = nextLeftColumnWidth => ({
  type: 'UPDATE_LEFT_COLUMN_WIDTH',
  nextLeftColumnWidth: nextLeftColumnWidth
})

const updateLeftColumnWidthServer = nextLeftColumnWidth => {
  return dispatch => {
    dispatch(setStatus('SAVING'))
    mutation.updateView(nextLeftColumnWidth).then(success => {
      success && dispatch(setStatus('SAVED'))
    })
  }
}