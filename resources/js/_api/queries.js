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

export const getContainer = async containerId => {
  return axios.get('/app/containers/' + containerId).then(response => {
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