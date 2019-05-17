//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, bool, func, string } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class Dropdown extends Component {
  
  constructor(props) {
    super(props)
    this.dropdownContainer = React.createRef()
  }
  
	state = {
		isEventListenersRegistered: false,
	}

	checkForClickOutside = e => {
		!this.dropdownContainer.contains(e.target) && this.closeDropdown()
	}

	componentDidMount = () => {
		this.setupEventListeners()
	}

	componentDidUpdate = () => {
		this.setupEventListeners()
	}

	componentWillUnmount = () => {
		this.removeEventListeners()
	}

	setupEventListeners = () => {
    const {
      isDropdownVisible
    } = this.props
		const { 
      isEventListenersRegistered 
    } = this.state

		if (isDropdownVisible) {
			!isEventListenersRegistered && this.addEventListeners()
		} 
    else {
			isEventListenersRegistered && this.removeEventListeners()
		}
	}

	closeDropdown = () => {
		const { 
      closeDropdown
    } = this.props
    closeDropdown !== null && closeDropdown()
	}

	addEventListeners = () => {
		document.addEventListener('keydown', this.handleKeyDown, false)
		document.addEventListener('mousedown', this.checkForClickOutside, false)
		this.setState({
			isEventListenersRegistered: true
		})
	}

	removeEventListeners = () => {
		document.removeEventListener('keydown', this.handleKeyDown, false)
		document.removeEventListener('mousedown', this.checkForClickOutside, false)
		this.setState({
			isEventListenersRegistered: false
		})
	}

	render() {
		const { 
      children,
      dropdownLeft,
      dropdownTop,
      isDropdownVisible,
      isRightAligned,
      width
    } = this.props
		return (
      <Container
        ref={c => (this.dropdownContainer = c)}
        containerMarginLeft={isRightAligned ? '-' + this.dropdownContainer.offsetWidth + 'px' : '0'}
        dropdownLeft={dropdownLeft}
        dropdownTop={dropdownTop}
        isDropdownVisible={isDropdownVisible}
        containerWidth={width}>
        { children }
      </Container>
		)
	}
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Dropdown.propTypes = {
  closeDropdown: func,
  chooseOption: func,
  dropdownLeft: string,
  dropdownTop: string,
  isDropdownVisible: bool,
  isRightAligned: bool,
  options: array,
  width: string
}

Dropdown.defaultProps = {
  isRightAligned: false,
  width: 'auto'
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 100000;
	display: ${ props => props.isDropdownVisible ? 'block' : 'none' };
  position: ${ props => props.dropdownLeft ? 'fixed' : 'absolute' };
  top: ${ props => props.dropdownTop ? props.dropdownTop : '0' };
  left: ${ props => props.dropdownLeft ? props.dropdownLeft : '0' };
  margin-left: ${ props => props.containerMarginLeft };
  background-color: ${ colors.DROPDOWN_BACKGROUND };
  color: white;
  font-size: 0.9rem;
  border-top-left-radius: 5px;
	overflow-y: scroll;
	scrollbar-width: none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
`

export default Dropdown