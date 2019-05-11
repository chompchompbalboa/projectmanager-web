//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from './axios'

//-----------------------------------------------------------------------------
// Queries
//-----------------------------------------------------------------------------

export const getCollection = async collectionId => {
  return axios.get('/app/collections/' + collectionId).then(response => {
    return response.data
  })
}

export const getContainer = async (containerId, collectionId, viewId) => {
  return axios.get('/app/containers/' + containerId, {
    params: {
      containerId: containerId,
      collectionId: collectionId,
      viewId: viewId
    }
  }).then(response => {
    return response.data
  })
}

export const getStructure = async userId => {
  return axios.get('/app/structure/' + userId).then(response => {
    return response.data
  })
}

export const getView = async viewId => {
  return axios.get('/app/views/' + viewId).then(response => {
    return response.data
  })
}

export const getOrganizationProjects = async organzationId => {
  return axios.get('/app/organizations/' + organzationId + '/projects').then(response => {
    return response.data
  })
}

export const getOrganizationTables = async organzationId => {
  return axios.get('/app/organizations/' + organzationId + '/tables').then(response => {
    return response.data
  })
}

export const getTable = async tableId => {
  return axios.get('/app/tables/' + tableId).then(response => {
    return response.data
  })
}