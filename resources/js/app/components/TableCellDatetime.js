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
    <Container>
      <DatePicker
        selected={moment(value).toDate()}
        onChange={date => updateValue(moment(date).format(dateConfig.format))}/>
    </Container>
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
const Container = styled.div`
`

export default TableCellDatetime