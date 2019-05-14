//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from './axios'

//-----------------------------------------------------------------------------
// Structure
//-----------------------------------------------------------------------------
export const createContainer = async (userId, newContainerId, newContainer) => {  
  return axios.post('/app/containers', { ...newContainer, user_id: userId }).then(response => {
    return {
      containerId: newContainerId,
      nextContainerId: response.data.id
    }
  })
}

export const createCollection = async (containerId, newCollectionId, newCollection) => {  
  return axios.post('/app/collections', { 
    collection: newCollection,
    containerId: containerId
  }).then(response => {
    return {
      collectionId: newCollectionId,
      nextCollectionId: response.data.id
    }
  })
}

export const createModule = async (viewId, newModuleId, newModule) => {  
  return axios.post('/app/modules', { 
    module: newModule,
    viewId: viewId
  }).then(response => {
    return {
      moduleId: newModuleId,
      nextModuleId: response.data.id
    }
  })
}

export const createView = async (collectionId, newViewId, newView) => {  
  return axios.post('/app/views', { 
    view: newView,
    collectionId: collectionId
  }).then(response => {
    return {
      viewId: newViewId,
      nextViewId: response.data.id
    }
  })
}

export const deleteCollection = async collectionId => {  
  return axios.delete('/app/collections/' + collectionId).then(response => {
    return response.data
  })
}

export const deleteContainer = async containerId => {  
  return axios.delete('/app/containers/' + containerId).then(response => {
    return response.data
  })
}

export const deleteModule = async moduleId => {  
  return axios.delete('/app/modules/' + moduleId).then(response => {
    return response.data
  })
}

export const deleteView = async viewId => {  
  return axios.delete('/app/views/' + viewId).then(response => {
    return response.data
  })
}

export const updateCollection = async (id, updates) => {
  return axios.patch('/app/collections/' + id, updates).then(response => {
    return response.data
  })
}

export const updateContainer = async (id, updates) => {
  return axios.patch('/app/containers/' + id, updates).then(response => {
    return response.data
  })
}

export const updateModule = async (id, updates) => {
  return axios.patch('/app/modules/' + id, updates).then(response => {
    return response.data
  })
}

export const updateView = async (id, updates) => {
  return axios.patch('/app/views/' + id, updates).then(response => {
    return response.data
  })
}

//-----------------------------------------------------------------------------
// Table
//-----------------------------------------------------------------------------
export const createTable = async (organizationId, projectId, tableId) => {  
  return axios.post('/app/tables', {
    organizationId: organizationId,
    projectId: projectId,
    tableId: tableId
  }).then(response => {
    return response.data
  })
}

export const createTableBreakdown = async (tableId, newBreakdown) => {  
  return axios.post('/app/tables/breakdowns', {
    newBreakdown: newBreakdown,
    tableId: tableId
  }).then(response => {
    return response.data
  })
}

export const createTableBreakdownFormula = async (breakdownId, newFormula) => {  
  return axios.post('/app/tables/breakdowns/formulas', {
    breakdownId: breakdownId,
    newFormula: newFormula
  }).then(response => {
    return response.data
  })
}

export const createTableColumn = async (newColumn, rowIds, columnPositions) => {  
  return axios.post('/app/tables/columns', {
    newColumn: newColumn,
    rowIds: rowIds,
    columnPositions: columnPositions
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

export const updateTableCell = async (id, value) => {  
  return axios.patch('/app/tables/cells/' + id, {
    id: id,
    value: value
  }).then(response => {
    return response.data
  })
}

export const updateTableColumn = async (id, updates) => {  
  return axios.patch('/app/tables/columns/' + id, updates).then(response => {
    return response.data
  })
}