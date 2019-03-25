let statusTimeout
const statusTimeoutDuration = 1500

export const setStatus = (status) => {
  return dispatch => {
    window.clearTimeout(statusTimeout)
    dispatch(setStatusReducer(status))
    statusTimeout = window.setTimeout(() => dispatch(setStatusReducer('READY')), statusTimeoutDuration)
  }
}

const setStatusReducer = status => ({
  type: 'SET_STATUS',
  status: status
})