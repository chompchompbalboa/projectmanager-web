//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../../_config'
import { query } from '../../_api'

import { 
  setTableId as setTableIdAction,
  setTables as setTablesAction
} from '../redux/table/tableActions'

import AppBusinessHeader from './AppBusinessHeader'
import AppContentContainer from './AppContentContainer'
import Loading from '../components/Loading'
import Tables from '../components/Tables'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  setTableId: nextTableId => dispatch(setTableIdAction(nextTableId)),
  setTables: nextTables => dispatch(setTablesAction(nextTables))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppBusiness extends Component {

  state = {
    isLoading: true
  }

  componentDidMount = () => {
    this.loadTables()
  }
  
  loadTables = () => {
    const {
      setTableId,
      setTables,
    } = this.props
    query.getOrganizationTables(organizationId).then(response => {
      const {
        activeTableId,
        tables
      } = response
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
                <AppBusinessHeader/>
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
AppBusiness.propTypes = {
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
`

export default connect(
  null,
  mapDispatchToProps
)(AppBusiness)