//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from './axios'

//-----------------------------------------------------------------------------
// Queries
//-----------------------------------------------------------------------------
export const getNote = async noteId => {
  return axios.get('/app/notes/' + noteId).then(response => {
    return response.data
  })
}
export const getTable = async tableId => {
  return axios.get('/app/tables/' + tableId).then(response => {
    return response.data
  })
}