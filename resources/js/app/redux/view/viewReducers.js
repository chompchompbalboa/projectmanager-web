//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import viewNormalizer from './viewNormalizer'

//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const normalizedViews = viewNormalizer(initialData.views)
const initialState = {
  views: normalizedViews.entities.views,
  viewIds: normalizedViews.result
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const viewReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_VIEW_IDS': {
      const {
        nextViewIds
      } = action
      return { ...state, viewIds: nextViewIds }
    }

    case 'UPDATE_VIEWS': {
      const {
        nextViews
      } = action
      return { ...state, views: nextViews }
    }

    default:
      return state
  }
}

export default viewReducers