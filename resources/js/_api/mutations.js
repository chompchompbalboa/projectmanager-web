//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from './axios'

//-----------------------------------------------------------------------------
// Folder
//-----------------------------------------------------------------------------
export const createFolder = async newFolder => {  
  return axios.post('/app/folders', newFolder).then(response => {
    return response.data
  })
}

export const deleteFolder = async (folderId) => {  
  return axios.delete('/app/folders/' + folderId).then(response => {
    return response.data
  })
}

export const updateFolder = async (id, updates) => {
  return axios.patch('/app/folders/' + id, updates).then(response => {
    return response.data
  })
}

//-----------------------------------------------------------------------------
// File
//-----------------------------------------------------------------------------
export const createFile = async (newFile) => {  
  return axios.post('/app/files', newFile).then(response => {
    return response.data
  })
}

export const updateFile = async (id, updates) => {
  return axios.patch('/app/files/' + id, updates).then(response => {
    return response.data
  })
}

export const deleteFile = async (fileId) => {  
  return axios.delete('/app/files/' + fileId).then(response => {
    return response.data
  })
}

//-----------------------------------------------------------------------------
// Note
//-----------------------------------------------------------------------------
export const updateNote = async (id, updates) => {
  return axios.patch('/app/notes/' + id, updates).then(response => {
    return response.data
  })
}

//-----------------------------------------------------------------------------
// Table
//-----------------------------------------------------------------------------
export const createTable = async (newTable) => {  
  return axios.post('/app/tables', newTable).then(response => {
    return response.data
  })
}

export const createTableColumn = async (newColumn, newCells) => {  
  return axios.post('/app/tables/columns', {
    newColumn: newColumn,
    newCells: newCells
  }).then(response => {
    return response.data
  })
}

export const createTableRow = async (newRow, newCells) => {  
  return axios.post('/app/tables/rows', {
    newRow: newRow,
    newCells: newCells
  }).then(response => {
    return response.data
  })
}

export const deleteTable = async (tableId) => {  
  return axios.delete('/app/tables/' + tableId).then(response => {
    return response.data
  })
}

export const deleteTableBreakdown = async (breakdownId) => {  
  return axios.delete('/app/tables/breakdowns/' + breakdownId).then(response => {
    return response.data
  })
}

export const deleteTableBreakdownFormula = async (formulaId) => {  
  return axios.delete('/app/tables/breakdowns/formulas/' + formulaId).then(response => {
    return response.data
  })
}

export const deleteTableColumn = async (columnId) => {  
  return axios.delete('/app/tables/columns/' + columnId).then(response => {
    return response.data
  })
}

export const deleteTableRow = async (rowId) => {  
  return axios.delete('/app/tables/rows/' + rowId).then(response => {
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

export const updateTableBreakdown = async (id, breakdown) => {  
  return axios.patch('/app/tables/breakdowns/' + id, {
    id: id,
    breakdown: breakdown
  }).then(response => {
    return response.data
  })
}

export const updateTableBreakdownFormula = async (id, formula) => {  
  return axios.patch('/app/tables/breakdowns/formulas/' + id, {
    id: id,
    formula: formula
  }).then(response => {
    return response.data
  })
}

export const updateTableCell = async (id, updates) => {  
  return axios.patch('/app/tables/cells/' + id, updates).then(response => {
    return response.data
  })
}

export const updateTableColumn = async (id, updates) => {  
  return axios.patch('/app/tables/columns/' + id, updates).then(response => {
    return response.data
  })
}