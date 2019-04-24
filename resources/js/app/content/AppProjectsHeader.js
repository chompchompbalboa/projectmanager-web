//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, object } from 'prop-types'
import { connect } from 'react-redux'

import { 
  setActiveProject as setActiveProjectAction 
} from '../redux/project/projectActions'

import AppHeader from './AppHeader'
import AppProjectsChooseProject from './AppProjectsChooseProject'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => {
  return {
    activeProject: state.project.activeProject,
    activeTable: state.project.activeTable,
    projects: state.project.projects
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
const AppProjectsHeader = ({ activeProject, changeActiveProject, projects }) => {
  return (
    <AppHeader>
      <AppProjectsChooseProject
        activeProject={activeProject}
        changeActiveProject={changeActiveProject}
        projects={projects}/>
    </AppHeader>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppProjectsHeader)