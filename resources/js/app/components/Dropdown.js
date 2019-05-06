//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, bool, func } from 'prop-types'
import styled from 'styled-components'

import { colors } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class Dropdown extends Component {
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
			isDropdownVisible
    } = this.props

		return (
      <Container
        ref={c => (this.dropdownContainer = c)}
        isDropdownVisible={isDropdownVisible}>
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
  isDropdownVisible: bool,
	options: array
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 100000;
	display: ${props => (props.isDropdownVisible ? 'block' : 'none')};
  position: absolute;
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