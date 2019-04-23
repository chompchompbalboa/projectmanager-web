//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../../_config'

import {
  updateActiveModal as updateActiveModalAction
} from '../redux/modal/modalActions'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  updateActiveModal: nextActiveModal => dispatch(updateActiveModalAction(nextActiveModal))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class Modal extends Component {

  constructor(props) {
    super(props)
    this.contentContainer = React.createRef()
  }

  handleClick = e => {
    if(!this.contentContainer.current.contains(e.target)) {
      const {
        updateActiveModal
      } = this.props
      updateActiveModal(null)
    }
  }

  render() {
    const {
      children
    } = this.props
    return (
      <Container
        onMouseDown={e => this.handleClick(e)}>
        <ContentContainer
          ref={this.contentContainer}>
          {children}
        </ContentContainer>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Modal.propTypes = {
  updateActiveModal: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContentContainer = styled.div`
  background-color: white;
  padding: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
	box-shadow: 1px 1px 4px ${colors.BOX_SHADOW};
`

export default connect(
  null,
  mapDispatchToProps
)(Modal)