//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import moment from 'moment'
import { func, string } from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

import { date as dateConfig } from '../../_config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TableCellDatetime = ({ updateValue, value }) => {
  return (
    <DatePicker
      autoComplete="new-password"
      customInput={<StyledInput/>}
      selected={value !== null ? moment(value).toDate() : null}
      onChange={date => updateValue(moment(date).format(dateConfig.format))}/>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableCellDatetime.propTypes = {
  value: string,
  updateValue: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled.input`
  cursor: pointer;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: inherit;
  font-weight: 600;
`

export default TableCellDatetime