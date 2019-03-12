//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array } from 'prop-types'
import styled from 'styled-components'

import AppProjectContent from './AppProjectContent'
import AppProjectSidebar from './AppProjectSidebar'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppProject extends Component {

  state = {
    activeProject: this.props.projects[0],
    activeTable: this.props.projects[0].tables[0]
  }

  changeActiveProject = (nextActiveProject) => {
    this.setState({
      activeProject: nextActiveProject
    })
  }

  changeActiveTable = (nextActiveTable) => {
    this.setState({
      activeTable: nextActiveTable
    })
  }

  render() {
    const {
      projects
    } = this.props
    const {
      activeProject,
      activeTable
    } = this.state
    return (
      <Container>
        <AppProjectSidebar
          activeProject={activeProject}
          activeTable={activeTable}
          changeActiveProject={this.changeActiveProject}
          changeActiveTable={this.changeActiveTable}
          projects={projects}/>
        <AppProjectContent 
          activeTable={activeTable}
          changeActiveTable={this.changeActiveTable}/>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProject.propTypes = {
  projects: array
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``
