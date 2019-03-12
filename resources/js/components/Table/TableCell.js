//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, node, number, oneOfType, string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCell = ({
	fontWeight,
	justifyContent,
	onClick,
	value,
	valueCursor,
	valueWidth100Percent,
	width
}) => {
	return (
		<Container
			fontWeight={fontWeight}
			justifyContent={justifyContent}
			widthPercentage={width}>
			<Value
				onClick={onClick}
				valueCursor={valueCursor}
				valueWidth100Percent={valueWidth100Percent}>
				{value}
			</Value>
		</Container>
	)
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableCell.propTypes = {
	fontWeight: string,
	justifyContent: string,
	onClick: func,
	value: oneOfType([node, number, string]),
	valueCursor: string,
	valueWidth100Percent: bool,
	width: number
}

TableCell.defaultProps = {
	fontWeight: 'inherit',
	justifyContent: 'center',
	valueCursor: 'auto',
	valueWidth100Percent: false,
	width: 1
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	padding: 0 0.5vw;
	width: calc(100% * ${props => props.widthPercentage});
	font-weight: ${props => props.fontWeight};
	display: flex;
	justify-content: ${props => props.justifyContent};
	align-items: center;
	text-align: center;
`

const Value = styled.div`
	cursor: ${props => props.valueCursor};
	width: ${props => (props.valueWidth100Percent ? '100%' : 'auto')};
	display: flex;
	justify-content: center;
	align-items: center;
`

export default TableCell
