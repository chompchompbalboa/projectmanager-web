//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import {
  selectSheetWidth
} from '../redux/sheet/sheetSelectors'

import SheetActions from './SheetActions'
import SheetHeader from './SheetHeader'
import SheetRows from './SheetRows'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  sheetWidth: selectSheetWidth(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class SheetComponent extends Component {
  render() {
    const {
      sheetWidth
    } = this.props

    return (
      <Container>
        <SheetActions />
        <SheetContainer>
          <Sheet sheetWidth={sheetWidth}>
            <SheetHeader />
            <SheetRows />
          </Sheet>
        </SheetContainer>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SheetComponent.propTypes = {
  setSheet: func,
  sheet: shape({
    id: string,
    columns: array,
    rows: array
  }),
  sheetWidth: number
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: scroll;
`

const SheetContainer = styled.div`
  width: 100%;
  z-index: 5;
`

const Sheet = styled.table`
  width: calc(${ props => props.sheetWidth + 'px'} + 3vw);
  background-color: ${ colors.SHEET_BACKGROUND };
  color: ${ colors.TEXT_BLACK };
  border-spacing: 0;
`

export default connect(
  mapStateToProps
)(SheetComponent)