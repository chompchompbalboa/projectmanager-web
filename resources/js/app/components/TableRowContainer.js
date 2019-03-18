//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../_config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableRowContainer = ({
	children,
	justifyContent
}) => {
	return (
		<Container
			justifyContent={justifyContent}>
			{children}
		</Container>
	)
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
TableRowContainer.propTypes = {
	justifyContent: string
}

TableRowContainer.defaultProps = {
	justifyContent: 'flex-start'
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	width: 100%;
	padding: 2vh 0;
	background-color: ${colors.BACKGROUND_SECONDARY};
	font-size: 13px;
	display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: center;
	border-right: 3px solid ${colors.BACKGROUND_SECONDARY};
	border-bottom: 1px solid ${colors.TEXT_LIGHT};
	&:hover {
		border-right: 3px solid ${colors.PRIMARY};
		background-color: ${colors.ACCENT};
	}
`

export default TableRowContainer
