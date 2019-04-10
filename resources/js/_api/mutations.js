//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from './axios'

//-----------------------------------------------------------------------------
// Queries
//-----------------------------------------------------------------------------
export const createColumn = async (newColumn, rowIds, columnPositions) => {  
  return axios.post('/app/columns', {
    newColumn: newColumn,
    rowIds: rowIds,
    columnPositions: columnPositions
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

export const createTable = async projectId => {  
  return axios.post('/app/tables', {
    projectId: projectId
  }).then(response => {
    return response.data
  })
}

export const deleteColumn = async (columnId) => {  
  return axios.delete('/app/columns/' + columnId).then(response => {
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

export const updateTable = async (id, table) => {  
  return axios.patch('/app/tables/' + id, {
    id: id,
    table: table
  }).then(response => {
    return response.data
  })
}