//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, shape } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import Table from '../components/Table'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppProjectContent extends Component {
	render() {
		const {
      activeTable
    } = this.props
		return (
			<Container>
        {activeTable &&
          <Table id={activeTable.id} />
        }
			</Container>
		)
	}
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjectContent.propTypes = {
  activeTable: shape({
    rows: array,
    structure: array
  })
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
  background-color: ${colors.BACKGROUND};
  box-shadow: 0px 0px 2px ${colors.BOX_SHADOW};
	overflow-y: scroll;
`
