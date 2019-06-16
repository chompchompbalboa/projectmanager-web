//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ResizeContainer extends Component {

  state = {
    currentPageX: null,
    startPageX: null
  }
  
  handleMouseDown = e => {
    e.preventDefault()
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
    this.setState({
      startPageX: e.pageX
    })
  }
  
  handleMouseMove = e => {
    document.body.style.cursor = 'col-resize'
    e.preventDefault()
    this.setState({
      currentPageX: e.pageX
    })
  }
  
  handleMouseUp = () => {
    document.body.style.cursor = null
    const {
      onResize
    } = this.props
    const {
      currentPageX,
      startPageX
    } = this.state
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
    onResize(currentPageX - startPageX)
    this.setState({
      currentPageX: null,
      startPageX: null
    })
  }
  render() {
    const {
      backgroundColor,
      containerWidth
    } = this.props
    const {
      currentPageX,
      startPageX
    } = this.state
    return (
      <Container
        backgroundColor={backgroundColor}
        containerWidth={containerWidth}
        left={(currentPageX - startPageX) === -startPageX ? 0 : (currentPageX - startPageX) + "px"}
        onMouseDown={e => this.handleMouseDown(e)}/>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ResizeContainer.propTypes = {
  backgroundColor: string,
  containerWidth: string,
  onResize: func
}

ResizeContainer.defaultProps = {
  containerWidth: '5px'
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;
  cursor: col-resize;
  left: ${ props => props.left };
  width: ${ props => props.containerWidth };
  height: 100%;
  background-color: ${ props => props.backgroundColor };
`