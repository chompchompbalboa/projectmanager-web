//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { number, func } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import Tables from '../components/Tables'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppProject extends Component {
  render() {
    return (
      <Container>
        <Tables />
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProject.propTypes = {
  leftColumnWidth: number,
  tableId: number,
  updateLeftColumnWidth: func
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

export default AppProject
