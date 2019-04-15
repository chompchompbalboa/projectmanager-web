//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import { connect } from 'react-redux'

import { query } from '../../_api'

import { 
  setActiveProject as setActiveProjectAction,
  setProjects as setProjectsAction
} from '../redux/project/projectActions'
import { 
  setTableId as setTableIdAction,
} from '../redux/table/tableActions'
import { 
  updateLeftColumnWidth as updateLeftColumnWidthAction
} from '../redux/view/viewActions';

import AppContentContainer from './AppContentContainer'
import AppProject from './AppProject'
import AppProjectsHeader from './AppProjectsHeader'
import Loading from '../components/Loading'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  setActiveProject: nextActiveProject => dispatch(setActiveProjectAction(nextActiveProject)),
  setTableId: nextTableId => dispatch(setTableIdAction(nextTableId)),
  setProjects: nextProjects => dispatch(setProjectsAction(nextProjects)),
  updateLeftColumnWidth: (nextLeftColumnWidth, isInitialLoad) => dispatch(updateLeftColumnWidthAction(nextLeftColumnWidth, isInitialLoad))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppProjects extends Component {

  state = {
    isLoading: true
  }

  componentDidMount = () => {
    const {
      setActiveProject,
      setTableId,
      setProjects,
      updateLeftColumnWidth
    } = this.props
    query.getOrganizationProjects(organizationId).then(response => {
      const {
        activeLeftColumnWidth,
        activeProject,
        activeTableId,
        projects
      } = response
      updateLeftColumnWidth(activeLeftColumnWidth, true)
      setActiveProject(activeProject)
      setTableId(activeTableId)
      setProjects(projects)
      this.setState({
        isLoading: false
      })
    })
  }

  render() {
    const {
      isActive
    } = this.props
    const {
      isLoading
    } = this.state

    return (
      <AppContentContainer
        isActive={isActive}>
        {isLoading
          ? <Loading 
              height="100vh"/>
          : <>
              <AppProjectsHeader/>
              <AppProject/>
            </>}
      </AppContentContainer>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjects.propTypes = {
  isActive: bool,
  setActiveProject: func,
  setTableId: func,
  setProjects: func,
  updateLeftColumnWidth: func
}

export default connect(
  null,
  mapDispatchToProps
)(AppProjects)
