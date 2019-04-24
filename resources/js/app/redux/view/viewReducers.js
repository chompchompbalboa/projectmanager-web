//-----------------------------------------------------------------------------
// Import
//-----------------------------------------------------------------------------
import { enums } from '../../../_config'
//-----------------------------------------------------------------------------
// Default State
//-----------------------------------------------------------------------------
const defaultState = {
  activeContent: enums.CONTENT.includes(initialData.activeContent) ? initialData.activeContent : 'PROJECTS',
  leftColumnWidth: 0.13
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const viewReducers = (state = defaultState, action) => {
  switch(action.type) {

    case 'UPDATE_ACTIVE_CONTENT': {
      const {
        nextActiveContent
      } = action
      return {
        ...state,
        activeContent: nextActiveContent
      }
    }

    case 'UPDATE_LEFT_COLUMN_WIDTH': {
      const {
        nextLeftColumnWidth
      } = action
      return {
        ...state,
        leftColumnWidth: nextLeftColumnWidth !== null ? nextLeftColumnWidth : state.leftColumnWidth
      }
    }

    default:
      return state
  }
}

export default viewReducers