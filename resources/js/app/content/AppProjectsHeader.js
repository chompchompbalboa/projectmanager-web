//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, object } from 'prop-types'
import styled from 'styled-components'

import { layout } from '../../_config'

import AppProjectsChooseProject from './AppProjectsChooseProject'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjectsHeader = ({ activeProject, changeActiveProject, projects}) => {
  return (
    <Container>
      <AppProjectsChooseProject
        activeProject={activeProject}
        changeActiveProject={changeActiveProject}
        projects={projects}/>
      <AppProjectsStatus>
        Waiting to save...
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
  projects: array
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

export default AppProjectsHeader