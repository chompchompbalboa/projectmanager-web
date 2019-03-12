//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, string } from 'prop-types'

import projects from '../data/projects'

import AppContentContainer from './AppContentContainer'
import AppProject from './AppProject'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProjects = ({ isActive }) =>  {
  return (
    <AppContentContainer
      isActive={isActive}>
      <AppProject
        projects={projects}/>
    </AppContentContainer>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjects.propTypes = {
  organizationId: string,
  isActive: bool
}

export default AppProjects
