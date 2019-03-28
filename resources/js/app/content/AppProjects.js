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
  setProjects: nextProjects => dispatch(setProjectsAction(nextProjects))
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
      setProjects
    } = this.props
    query.getOrganizationProjects(organizationId).then(projects => {
      setActiveProject(projects[0])
      setTableId(projects[0].tables[0].id)
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
  setProjects: func
}

export default connect(
  null,
  mapDispatchToProps
)(AppProjects)
