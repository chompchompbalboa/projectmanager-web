//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableRowContainer = ({
	backgroundColor,
	children,
	isHeader,
	justifyContent
}) => {
	return (
		<Container
			backgroundColor={backgroundColor}
			isHeader={isHeader}
			justifyContent={justifyContent}>
			{children}
		</Container>
	)
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
TableRowContainer.propTypes = {
	backgroundColor: string,
	isHeader: bool,
	justifyContent: string
}

TableRowContainer.defaultProps = {
	backgroundColor: colors.BACKGROUND_SECONDARY,
	isHeader: false,
	justifyContent: 'flex-start'
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	position: ${props => (props.isHeader ? 'sticky' : 'static')};
	top: ${props => (props.isHeader ? 'calc(-1*' + layout.PADDING + ')' : '0')};
	width: 100%;
	padding: 1.5vh 0;
	background-color: ${props => props.backgroundColor};
	font-size: ${props => (props.isHeader ? '14.5px' : '13px')};
	font-weight: ${props => (props.isHeader ? 'bold' : 'normal')};
	display: flex;
	justify-content: ${props => props.justifyContent};
	border-right: 3px solid ${props => props.backgroundColor};
	border-bottom: 1px solid ${colors.TEXT_LIGHT};
	&:hover {
		border-right: ${props =>
			props.isHeader
				? '3px solid ' + props.backgroundColor
				: '3px solid ' + colors.PRIMARY};
		background-color: ${props =>
			props.isHeader ? props.backgroundColor : colors.ACCENT};
	}
`

export default TableRowContainer
