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

export default AppProjectsHeader