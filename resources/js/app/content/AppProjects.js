//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import { connect } from 'react-redux'

import { query } from '../../_api'

import { 
  setActiveProject as setActiveProjectAction,
  setActiveTableId as setActiveTableIdAction,
  setProjects as setProjectsAction
} from '../actions/projectActions'

import AppContentContainer from './AppContentContainer'
import AppProject from './AppProject'
import AppProjectsHeader from './AppProjectsHeader'
import Loading from '../components/Loading'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  setActiveProject: nextActiveProject => dispatch(setActiveProjectAction(nextActiveProject)),
  setActiveTableId: nextActiveTableId => dispatch(setActiveTableIdAction(nextActiveTableId)),
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
      setActiveTableId,
      setProjects
    } = this.props
    query.getOrganizationProjects(organizationId).then(projects => {
      setActiveProject(projects[0])
      setActiveTableId(projects[0].tables[0].id)
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
  setActiveTableId: func,
  setProjects: func
}

export default connect(
  null,
  mapDispatchToProps
)(AppProjects)
