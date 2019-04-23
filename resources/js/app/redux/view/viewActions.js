//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation } from '../../../_api'

import { 
  setStatus 
} from '../status/statusActions'

//-----------------------------------------------------------------------------
// Update Left Column Width
//-----------------------------------------------------------------------------
export const updateActiveContent = nextActiveContent => ({
  type: 'UPDATE_ACTIVE_CONTENT',
  nextActiveContent: nextActiveContent
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