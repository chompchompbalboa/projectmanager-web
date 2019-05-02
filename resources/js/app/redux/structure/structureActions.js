//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { query } from '../../../_api'

import { selectUserId } from '../user/userSelectors'

//-----------------------------------------------------------------------------
// Set Structure
//-----------------------------------------------------------------------------
export const setStructure = () => {
  return (dispatch, getState) => {
    const userId = selectUserId(getState())
    query.getStructure(userId).then(structure => {
      dispatch(setStructureReducer(structure))
    })
  }
}

const setStructureReducer = structure => ({
  type: 'SET_STRUCTURE',
  structure: structure
})