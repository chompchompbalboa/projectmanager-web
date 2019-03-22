//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, object, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { layout } from '../../_config'

import AppProjectsChooseProject from './AppProjectsChooseProject'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => {
  return {
    statusMessage: state.status.message
  }
}

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectsHeader = ({ activeProject, changeActiveProject, projects, statusMessage }) => {
  return (
    <Container>
      <AppProjectsChooseProject
        activeProject={activeProject}
        changeActiveProject={changeActiveProject}
        projects={projects}/>
      <AppProjectsStatus>
        { statusMessage }
      </AppProjectsStatus>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjectsHeader.propTypes = {
  activeProject: object,
  changeActiveProject: func,
  projects: array,
  statusMessage: string
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: ${ layout.SIDEBAR_WIDTH };
  height: ${ layout.HEADER_HEIGHT };
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH });
  padding: ${ layout.PADDING };
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AppProjectsStatus = styled.div`
  margin-right: calc(2 * ${ layout.PADDING });
  font-size: 0.9em;
  font-color: rgb(240,240,240)
`

export default connect(
  mapStateToProps
)(AppProjectsHeader)