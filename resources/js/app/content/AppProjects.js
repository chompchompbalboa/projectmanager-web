//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { query } from '../../_api'
import { colors, layout } from '../../_config'

import { 
  setActiveProject as setActiveProjectAction,
  setProjects as setProjectsAction
} from '../redux/project/projectActions'
import { 
  setTableId as setTableIdAction,
  setTables as setTablesAction
} from '../redux/table/tableActions'
import { 
  updateLeftColumnWidth as updateLeftColumnWidthAction
} from '../redux/view/viewActions'

import AppContentContainer from './AppContentContainer'
import AppProjectsHeader from './AppProjectsHeader'
import Loading from '../components/Loading'
import Tables from '../components/Tables'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  organizationId: state.organization.id
})

const mapDispatchToProps = dispatch => ({
  setActiveProject: nextActiveProject => dispatch(setActiveProjectAction(nextActiveProject)),
  setTableId: nextTableId => dispatch(setTableIdAction(nextTableId)),
  setTables: nextTables => dispatch(setTablesAction(nextTables)),
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
    this.loadTables()
  }
  
  loadTables = () => {
    const {
      organizationId,
      setActiveProject,
      setProjects,
      setTableId,
      setTables,
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
      setTables(activeProject.tables)
      setTableId(activeTableId)
      setProjects(projects)
      this.setState({
        isLoading: false
      })
    })
  }

  render() {
    const {
      isLoading
    } = this.state

    return (
      <AppContentContainer>
        <Container>
          {isLoading
            ? <Loading 
                height="100vh"/>
            : <>
                <AppProjectsHeader/>
                <Tables/>
              </>
          }
        </Container>
      </AppContentContainer>
    )
  }
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: fixed;
  top: ${layout.HEADER_HEIGHT};
  left: ${layout.SIDEBAR_WIDTH};
  width: calc(100vw - ${layout.SIDEBAR_WIDTH});
  height: calc(100vh - ${layout.HEADER_HEIGHT});
  box-shadow: 0px 0px 2px ${colors.BOX_SHADOW};
  background-color: ${colors.BACKGROUND};
`

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjects.propTypes = {
  organizationId: number,
  setActiveProject: func,
  setProjects: func,
  setTableId: func,
  setTables: func,
  updateLeftColumnWidth: func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppProjects)
