//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, shape } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import Table from '../components/Table/Table'

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
          <Table 
            rows={activeTable.rows} 
            structure={activeTable.structure} />
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
	top: 0;
	left: calc(${layout.SIDEBAR_WIDTH} + ${layout.PROJECT_SIDEBAR_WIDTH});
	width: calc(
		100vw - ${layout.SIDEBAR_WIDTH} - ${layout.PROJECT_SIDEBAR_WIDTH}
	);
	height: 100vh;
	padding: ${layout.PADDING};
	background-color: ${colors.BACKGROUND};
	overflow-y: scroll;
`
