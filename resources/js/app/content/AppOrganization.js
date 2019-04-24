//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../../_config'
import { query } from '../../_api'

import { 
  setTableId as setTableIdAction,
  setTables as setTablesAction
} from '../redux/table/tableActions'

import { 
  setOrganizationName as setOrganizationNameAction
} from '../redux/organization/organizationActions'

import AppOrganizationHeader from './AppOrganizationHeader'
import AppContentContainer from './AppContentContainer'
import Loading from '../components/Loading'
import Tables from '../components/Tables'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  organizationId: state.organization.id
})

const mapDispatchToProps = dispatch => ({
  setTableId: nextTableId => dispatch(setTableIdAction(nextTableId)),
  setTables: nextTables => dispatch(setTablesAction(nextTables)),
  setOrganizationName: nextOrganizationName => dispatch(setOrganizationNameAction(nextOrganizationName))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppOrganization extends Component {

  state = {
    isLoading: true
  }

  componentDidMount = () => {
    this.loadTables()
  }
  
  loadTables = () => {
    const {
      organizationId,
      setOrganizationName,
      setTableId,
      setTables,
    } = this.props
    query.getOrganizationTables(organizationId).then(organization => {
      const {
        name,
        activeTableId,
        tables
      } = organization
      setOrganizationName(name)
      setTables(tables)
      setTableId(activeTableId)
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
                <AppOrganizationHeader/>
                <Tables />
              </>
          }
        </Container>
      </AppContentContainer>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppOrganization.propTypes = {
  organizationId: number,
  setOrganizationName: func,
  setTables: func,
  setTableId: func
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppOrganization)