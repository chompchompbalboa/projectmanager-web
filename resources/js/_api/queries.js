//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axios from './axios'

//-----------------------------------------------------------------------------
// Queries
//-----------------------------------------------------------------------------
export const getAppInitialData = async () => {
  return axios.get('/app/initial-data').then(response => {
    return response.data
  })
}

export const getOrganizationProjects = async (organzationId) => {
  return axios.get('/app/organizations/' + organzationId + '/projects').then(response => {
    return response.data
  })
}

export const getTable = async (tableId) => {
  return axios.get('/app/tables/' + tableId).then(response => {
    return response.data
  })
}