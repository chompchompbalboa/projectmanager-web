//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import moduleNormalizer from './moduleNormalizer'

//-----------------------------------------------------------------------------
// Initial
//-----------------------------------------------------------------------------
const normalizedModules = moduleNormalizer(initialData.modules)
const initialState = {
  modules: normalizedModules.entities.modules,
  moduleIds: normalizedModules.result
}

//-----------------------------------------------------------------------------
// Reducers
//-----------------------------------------------------------------------------
const moduleReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_MODULE_IDS': {
      const {
        nextModuleIds
      } = action
      return { ...state, moduleIds: nextModuleIds }
    }

    case 'UPDATE_MODULES': {
      const {
        nextModules
      } = action
      return { ...state, modules: nextModules }
    }

    default:
      return state
  }
}

export default moduleReducers