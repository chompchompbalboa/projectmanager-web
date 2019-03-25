//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, object, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { layout } from '../../_config'

import { setActiveProject as setActiveProjectAction } from '../actions/projectActions'

import AppProjectsChooseProject from './AppProjectsChooseProject'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => {
  return {
    activeProject: state.project.activeProject,
    activeTable: state.project.activeTable,
    projects: state.project.projects,
    status: state.status.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActiveProject: nextActiveProject => dispatch(setActiveProjectAction(nextActiveProject))
  }
}

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectsHeader = ({ activeProject, changeActiveProject, projects, status }) => {
  return (
    <Container>
      <AppProjectsChooseProject
        activeProject={activeProject}
        changeActiveProject={changeActiveProject}
        projects={projects}/>
      <AppProjectsStatus>
        {status}
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
  status: string
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
  mapStateToProps,
  mapDispatchToProps
)(AppProjectsHeader)