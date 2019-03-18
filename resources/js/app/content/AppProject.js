//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, object } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import AppProjectChooseTable from './AppProjectChooseTable'
import Table from '../components/Table'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppProject extends Component {

  render() {
    const {
      activeProject,
      activeTable,
      changeActiveTable
    } = this.props
    
    return (
      <Container>
        <LeftColumn>
          <AppProjectChooseTable
            activeTable={activeTable}
            changeActiveTable={changeActiveTable}
            tables={activeProject.tables}/>
        </LeftColumn>
        <RightColumn>
          <Table id={activeTable.id} />
        </RightColumn>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProject.propTypes = {
  activeProject: object,
  activeTable: object,
  changeActiveTable: func
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
  padding: ${layout.PADDING};
  display: flex;
  justify-content: space-between;
  background-color: ${colors.BACKGROUND};
  box-shadow: 0px 0px 2px ${colors.BOX_SHADOW};
  overflow-y: scroll;
`

const LeftColumn = styled.div`
  position: sticky;
  top: 0;
  width: calc(13% - (${layout.PADDING} / 1.5));
`

const RightColumn = styled.div`
  width: calc(87% - (${layout.PADDING} / 1.5));
`
