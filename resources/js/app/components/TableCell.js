//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, node, number, oneOfType, string } from 'prop-types'
import styled from 'styled-components'

import { layout } from '../../_config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCell = ({
	fontWeight,
	justifyContent,
  onClick,
	value,
	valueCursor,
	width
}) => {
	return (
		<Container
			fontWeight={fontWeight}
			justifyContent={justifyContent}
			widthPercentage={width}>
			<Value
				onClick={onClick}
				valueCursor={valueCursor}>
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
  type: string,
	value: oneOfType([node, number, string]),
	valueCursor: string,
	width: number
}

TableCell.defaultProps = {
	fontWeight: 'inherit',
	justifyContent: 'center',
	valueCursor: 'auto',
	width: 1
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	padding: 0 ${ layout.TABLE_PADDING };
	width: calc(100% * ${props => props.widthPercentage});
	font-weight: ${props => props.fontWeight};
	display: flex;
	justify-content: ${props => props.justifyContent};
  align-items: flex-start;
`

const Value = styled.div`
	cursor: ${props => props.valueCursor};
	width: 100%;
`

export default TableCell
