//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import {
  setTable as setTableAction 
} from '../redux/table/tableActions'
import {
  selectTableWidth
} from '../redux/table/tableSelectors'

import TableActions from './TableActions'
import TableHeader from './TableHeader'
import TableRows from './TableRows'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  tableWidth: selectTableWidth(state)
})

const mapDispatchToProps = dispatch => ({
  setTable: table => dispatch(setTableAction(table))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class TableComponent extends Component {

  componentDidMount = () => {
    const {
      setTable,
      table
    } = this.props
    setTable(table)
  }
  
  render() {
    const {
      tableWidth
    } = this.props

    return (
      <Container>
        <TableActions />
        <TableContainer>
          <Table tableWidth={tableWidth}>
            <TableHeader />
            <TableRows />
          </Table>
        </TableContainer>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TableComponent.propTypes = {
  setTable: func,
  table: shape({
    id: string,
    columns: array,
    rows: array
  }),
  tableWidth: number
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: scroll;
`

const TableContainer = styled.div`
  width: 100%;
  z-index: 5;
`

const Table = styled.table`
  width: ${ props => props.tableWidth + 'px'};
  background-color: ${ colors.TABLE_BACKGROUND };
  color: ${ colors.TEXT_BLACK };
  border-spacing: 0;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)