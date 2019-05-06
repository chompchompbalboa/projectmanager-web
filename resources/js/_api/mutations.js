//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from './axios'

//-----------------------------------------------------------------------------
// Queries
//-----------------------------------------------------------------------------
export const createBreakdown = async (tableId, newBreakdown) => {  
  return axios.post('/app/breakdowns', {
    newBreakdown: newBreakdown,
    tableId: tableId
  }).then(response => {
    return response.data
  })
}
export const createColumn = async (newColumn, rowIds, columnPositions) => {  
  return axios.post('/app/columns', {
    newColumn: newColumn,
    rowIds: rowIds,
    columnPositions: columnPositions
  }).then(response => {
    return response.data
  })
}

export const createContainer = async (userId, newContainerId, newContainer) => {  
  return axios.post('/app/containers', { ...newContainer, user_id: userId }).then(response => {
    return {
      containerId: newContainerId,
      nextContainerId: response.data.id
    }
  })
}

export const createRow = async (newRow) => {  
  return axios.post('/app/rows', {
    newRow: newRow
  }).then(response => {
    return response.data
  })
}

export const createFormula = async (breakdownId, newFormula) => {  
  return axios.post('/app/formulas', {
    breakdownId: breakdownId,
    newFormula: newFormula
  }).then(response => {
    return response.data
  })
}

export const createTable = async (organizationId, projectId, tableId) => {  
  return axios.post('/app/tables', {
    organizationId: organizationId,
    projectId: projectId,
    tableId: tableId
  }).then(response => {
    return response.data
  })
}

export const deleteBreakdown = async (breakdownId) => {  
  return axios.delete('/app/breakdowns/' + breakdownId).then(response => {
    return response.data
  })
}

export const deleteColumn = async (columnId) => {  
  return axios.delete('/app/columns/' + columnId).then(response => {
    return response.data
  })
}

export const deleteContainer = async containerId => {  
  return axios.delete('/app/containers/' + containerId).then(response => {
    return response.data
  })
}

export const deleteFormula = async (formulaId) => {  
  return axios.delete('/app/formulas/' + formulaId).then(response => {
    return response.data
  })
}

export const deleteRow = async (rowId) => {  
  return axios.delete('/app/rows/' + rowId).then(response => {
    return response.data
  })
}

export const deleteTable = async (tableId) => {  
  return axios.delete('/app/tables/' + tableId).then(response => {
    return response.data
  })
}

export const updateBreakdown = async (id, breakdown) => {  
  return axios.patch('/app/breakdowns/' + id, {
    id: id,
    breakdown: breakdown
  }).then(response => {
    return response.data
  })
}

export const updateFormula = async (id, formula) => {  
  return axios.patch('/app/formulas/' + id, {
    id: id,
    formula: formula
  }).then(response => {
    return response.data
  })
}

export const updateContainer = async (id, updates) => {
  return axios.patch('/app/containers/' + id, updates).then(response => {
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

export const updateView = async nextLeftColumnWidth => {  
  return axios.patch('/app/view', {
    nextLeftColumnWidth: nextLeftColumnWidth,
  }).then(response => {
    return response.data
  })
}