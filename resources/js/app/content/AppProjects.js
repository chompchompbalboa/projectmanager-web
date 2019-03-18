//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, string } from 'prop-types'

import { query } from '../../_api'

import AppContentContainer from './AppContentContainer'
import AppProject from './AppProject'
import AppProjectsHeader from './AppProjectsHeader'
import Loading from '../components/Loading'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppProjects extends Component {

  state = {
    activeProject: null,
    activeTable: null,
    projects: null
  }

  componentDidMount = () => {
    query.getOrganizationProjects(organizationId).then(projects => {
      this.setState({
        activeProject: projects[0],
        activeTable: projects[0].tables[0],
        projects: projects 
      })
    })
  }

  changeActiveProject = (nextActiveProject) => {
    this.setState({
      activeProject: nextActiveProject,
      activeTable: nextActiveProject.tables[0]
    })
  }

  changeActiveTable = (nextActiveTable) => {
    this.setState({
      activeTable: nextActiveTable
    })
  }

  render() {
    const {
      isActive
    } = this.props
    const {
      activeProject,
      activeTable,
      projects
    } = this.state

    return (
      <AppContentContainer
        isActive={isActive}>
        {projects === null
          ? <Loading 
              height="100vh"/>
          : <>
              <AppProjectsHeader
                  activeProject={activeProject}
                  changeActiveProject={this.changeActiveProject}
                  projects={projects}/>
              <AppProject
                  activeProject={activeProject}
                  activeTable={activeTable}
                  changeActiveProject={this.changeActiveProject}
                  changeActiveTable={this.changeActiveTable}
                  projects={projects}/>
            </>}
      </AppContentContainer>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjects.propTypes = {
  organizationId: string,
  isActive: bool
}
