//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { number, func } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../../_config'

import {
  updateLeftColumnWidth as updateLeftColumnWidthAction
} from '../redux/view/viewActions'

import AppProjectChooseTable from './AppProjectChooseTable'
import HiddenScrollbarContainer from '../components/HiddenScrollbarContainer'
import Table from '../components/Table'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  leftColumnWidth: state.view.leftColumnWidth,
  tableId: state.table.id
})

const mapDispatchToProps = dispatch => ({
  updateLeftColumnWidth: nextLeftColumnWidth => dispatch(updateLeftColumnWidthAction(nextLeftColumnWidth))
})
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppProject extends Component {
  
  constructor(props) {
    super(props)
    this.appProjectContainer = React.createRef()
  }
  
  state = {
    isResizing: false,
    mouseDownPageX: null,
    mouseDownResizePageX: null,
  }

  componentWillUnmount = () => {
    window.removeEventListener('mousemove', this.handleResizeMouseMove)
    window.removeEventListener('mouseup', this.handleResizeMouseUp)
  }
  
  handleResizeMouseDown = e => {
    e.preventDefault()
    window.addEventListener('mousemove', this.handleResizeMouseMove)
    window.addEventListener('mouseup', this.handleResizeMouseUp)
    this.setState({
      isResizing: true,
      mouseDownPageX: e.pageX
    })
  }
  
  handleResizeMouseMove = e => {
    document.body.style.cursor = 'col-resize'
    e.preventDefault()
    const {
      isResizing,
      mouseDownPageX
    } = this.state
    if(isResizing) {
      const nextMouseDownResizePageX = Number(e.pageX - mouseDownPageX)
      this.setState({
        mouseDownResizePageX: nextMouseDownResizePageX
      })
    }
  }
  
  handleResizeMouseUp = e => {
    document.body.style.cursor = null
    const {
      leftColumnWidth,
      updateLeftColumnWidth
    } = this.props
    const {
      isResizing,
      mouseDownPageX
    } = this.state
    window.removeEventListener('mousemove', this.handleResizeMouseMove)
    window.removeEventListener('mouseup', this.handleResizeMouseUp)
    if(isResizing) {
      const percentChange = Number(((e.pageX - mouseDownPageX) / this.appProjectContainer.current.offsetWidth).toFixed(2))
      updateLeftColumnWidth(Number((leftColumnWidth + percentChange).toFixed(2)))
    }
    this.setState({
      isResizing: false,
      mouseDownPageX: null,
      mouseDownResizePageX: null
    })
  }

  render() {
    const {
      leftColumnWidth,
      tableId
    } = this.props
    const {
      isResizing,
      mouseDownResizePageX
    } = this.state
    return (
      <Container
        ref={this.appProjectContainer}>
        <LeftColumn
          leftColumnWidth={leftColumnWidth}>
          <AppProjectChooseTable />
        </LeftColumn>
        <MiddleColumn>
          <ResizeContainer
            isResizing={isResizing}
            left={mouseDownResizePageX === null ? 0 : mouseDownResizePageX}
            onMouseDown={e => this.handleResizeMouseDown(e)}/>
        </MiddleColumn>
        <RightColumn
          leftColumnWidth={leftColumnWidth}>
          <Table 
            id={tableId}/>
        </RightColumn>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProject.propTypes = {
  leftColumnWidth: number,
  tableId: number,
  updateLeftColumnWidth: func
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
  display: flex;
  justify-content: space-between;
  background-color: ${colors.BACKGROUND};
  box-shadow: 0px 0px 2px ${colors.BOX_SHADOW};
  overflow-y: scroll;
`

const LeftColumn = styled(HiddenScrollbarContainer)`
  z-index: 2;
  position: sticky;
  top: 0;
  left: 0;
  width: calc(${ props => props.leftColumnWidth * 100 }% - ${ props => props.isResizing ? '2px' : '(' +  layout.TABLE_PADDING + '/3)'});
  padding-top: ${layout.PADDING};
  display: flex;
`

const MiddleColumn = styled.div`
  z-index: 3;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  height: 100%;
`

const ResizeContainer = styled.div`
  cursor: col-resize;
  position: relative;
  left: ${ props => props.left }px;
  width: ${ props => props.isResizing ? '2px' : 'calc(' +  layout.TABLE_PADDING + '/3)'};
  height: 100%;
  background-color: ${ props => props.isResizing ? colors.PRIMARY : 'transparent'};
`

const RightColumn = styled.div`
  z-index: 1;
  width: calc(${ props => (1 - props.leftColumnWidth) * 100 }% - 5px - ${ props => props.isResizing ? '2px' : 'calc(' +  layout.TABLE_PADDING + '/3)'});
  padding-top: ${layout.PADDING};
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AppProject))
