//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from './axios'

//-----------------------------------------------------------------------------
// Queries
//-----------------------------------------------------------------------------
export const createColumn = async (newColumn, rowIds) => {  
  return axios.post('/app/columns', {
    newColumn: newColumn,
    rowIds: rowIds
  }).then(response => {
    return response.data
  })
}

export const createRow = async (newRow) => {  
  return axios.post('/app/rows', {
    newRow: newRow
  }).then(response => {
    return response.data
  })
}

export const deleteRow = async (rowId) => {  
  return axios.delete('/app/rows/' + rowId).then(response => {
    return response.data
  })
}

export const updateCell = async (id, value) => {  
  return axios.patch('/app/cells/' + id, {
    id: id,
    value: value
  }).then(response => {
    return response.data
  })
}

export const updateColumn = async (id, column) => {  
  return axios.patch('/app/columns/' + id, {
    id: id,
    column: column
  }).then(response => {
    return response.data
  })
}