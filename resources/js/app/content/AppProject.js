//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { number } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import AppProjectChooseTable from './AppProjectChooseTable'
import Table from '../components/Table'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  tableId: state.table.id
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppProject = ({ tableId }) => {
  return (
    <Container>
      <LeftColumn>
        <AppProjectChooseTable />
      </LeftColumn>
      <RightColumn>
        <Table 
          id={tableId}/>
      </RightColumn>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProject.propTypes = {
  tableId: number
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
  z-index: 2;
  position: sticky;
  top: 0;
  left: 0;
  width: calc(13% - (${layout.PADDING} / 1.5));
  overflow-x: visible;
  overflow-y: scroll;
`

const RightColumn = styled.div`
  z-index: 1;
  width: calc(87% - (${layout.PADDING} / 1.5));
`

export default connect(
  mapStateToProps
)(React.memo(AppProject))
