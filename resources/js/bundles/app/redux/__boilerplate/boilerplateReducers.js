//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { fromJS } from 'immutable'

import viewNormalizer from './viewNormalizer'

//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const normalizedViews = viewNormalizer(initialData.views)
const initialState = fromJS({
  views: normalizedViews.entities.views,
  viewIds: normalizedViews.result
})

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const viewReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_VIEW_IDS': {
      const {
        nextViewIds
      } = action
      return state.set('viewIds', fromJS(nextViewIds))
    }

    case 'UPDATE_VIEWS': {
      const {
        nextViews
      } = action
      return state.set('views', fromJS(nextViews))
    }

    default:
      return state
  }
}

export default viewReducers