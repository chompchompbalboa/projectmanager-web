//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, shape, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class AppProjectsChooseProject extends Component {
	state = {
		dropdownInputValue: '',
		eventListenersRegistered: false,
		isDropdownVisible: false,
		isOnlyOneProjectVisible: false,
		projects: this.props.projects
	}

	changeActiveProject = nextActiveProject => {
		const { changeActiveProject } = this.props
		changeActiveProject(nextActiveProject)
		this.toggleDropdownVisible()
		this.removeEventListeners()
	}

	changeDropdownInputValue = nextDropdownInputValue => {
		const { nextProjects, nextIsOnlyOneProjectVisible } = this.filterProjects(
			nextDropdownInputValue
		)
		this.setState({
			dropdownInputValue: nextDropdownInputValue,
			isOnlyOneProjectVisible: nextIsOnlyOneProjectVisible,
			projects: nextProjects
		})
	}

	checkForClickOutside = e => {
		!this.dropdownContainer.contains(e.target) && this.toggleDropdownVisible()
	}

	componentDidMount = () => {
		this.inputSetup()
	}

	componentDidUpdate = () => {
		this.inputSetup()
	}

	componentWillUnmount = () => {
		this.removeEventListeners()
	}

	filterProjects = searchValue => {
		const { projects } = this.props

		// eslint-disable-next-line
		let filteredProjects = projects.filter(project => {
			const stringToSearch = project.name
			const searchValueInString =
				stringToSearch.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
			if (searchValueInString) {
				return project
			}
		})
		const isOnlyOneProjectVisible =
			filteredProjects.length === 0 ? false : filteredProjects.length === 1
		filteredProjects =
			filteredProjects.length === 0
				? [{ name: 'No results found', uniqueId: null }]
				: filteredProjects
		return {
			nextProjects: filteredProjects,
			nextIsOnlyOneProjectVisible: isOnlyOneProjectVisible
		}
	}

	handleKeyDown = e => {
		const { isOnlyOneProjectVisible, projects } = this.state

		if (e.keyCode === 13) {
			// Enter
			if (isOnlyOneProjectVisible && projects[0].uniqueId !== null) {
				this.changeActiveProject(projects[0])
			}
		}
	}

	inputSetup = () => {
		const { eventListenersRegistered, isDropdownVisible } = this.state

		if (isDropdownVisible) {
			!eventListenersRegistered && this.addEventListeners()
			this.dropdownInput.focus()
		} else {
			eventListenersRegistered && this.removeEventListeners()
		}
	}

	toggleDropdownVisible = () => {
		const { projects } = this.props
		const { isDropdownVisible } = this.state
		this.setState({
			dropdownInputValue: '',
			isDropdownVisible: !isDropdownVisible,
			isOnlyOneProjectVisible: false,
			projects: projects
		})
	}

	addEventListeners = () => {
		document.addEventListener('keydown', this.handleKeyDown, false)
		document.addEventListener('mousedown', this.checkForClickOutside, false)
		this.setState({
			eventListenersRegistered: true
		})
	}

	removeEventListeners = () => {
		document.removeEventListener('keydown', this.handleKeyDown, false)
		document.removeEventListener('mousedown', this.checkForClickOutside, false)
		this.setState({
			eventListenersRegistered: false
		})
	}

	render() {
		const { activeProject } = this.props
		const {
			dropdownInputValue,
			isDropdownVisible,
			isOnlyOneProjectVisible,
			projects
		} = this.state

		return (
			<Container>
				<CurrentProjectContainer>
					<CurrentProjectName onClick={() => this.toggleDropdownVisible()}>
						{activeProject && activeProject.name}
					</CurrentProjectName>
				</CurrentProjectContainer>
				<DropdownContainer
					ref={c => (this.dropdownContainer = c)}
					isDropdownVisible={isDropdownVisible}>
					<DropdownInput
						ref={c => (this.dropdownInput = c)}
						onChange={e => this.changeDropdownInputValue(e.target.value)}
						placeholder="Search by project name"
						value={dropdownInputValue}
					/>
					{projects.map((project, index) => {
						return (
							<DropdownProjectContainer
								key={index}
								isOnlyOneProjectVisible={isOnlyOneProjectVisible}
								onClick={() => this.changeActiveProject(project)}>
								<DropdownProjectName>{project.name}</DropdownProjectName>
							</DropdownProjectContainer>
						)
					})}
				</DropdownContainer>
			</Container>
		)
	}
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppProjectsChooseProject.propTypes = {
	activeProject: shape({
		name: string,
		uniqueId: string
	}),
	changeActiveProject: func,
	projects: array
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	z-index: 10000;
	padding: ${layout.PADDING} 0 ${layout.PADDING} calc(${layout.PADDING} / 1.5);
`

const CurrentProjectContainer = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	color: ${colors.TEXT_DARK};
`

const CurrentProjectName = styled.div`
	font-weight: bold;
	font-size: 22px;
	display: flex;
	align-items: flex-end;
	&:hover {
		color: ${colors.PRIMARY};
	}
`

const DropdownContainer = styled.div`
	z-index: 1000;
	display: ${props => (props.isDropdownVisible ? 'block' : 'none')};
	position: absolute;
	margin-left: calc(-${layout.PADDING} / 1.5);
	max-height: 50%;
	min-width: 100%;
	background-color: white;
	border-top: 1.25px solid ${colors.BACKGROUND};
	border-left: 1.25px solid ${colors.BACKGROUND};
	box-shadow: 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.16);
	font-size: 14px;
	overflow-y: scroll;
	scrollbar-width: none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
`

const DropdownInput = styled.input`
	width: 100%;
	border: none;
	padding: 0.5vw 0 0.5vw 0.75vw;
	font-size: 14px;
	outline: none;
	border-bottom: 1.25px solid ${colors.BACKGROUND};
`

const DropdownProjectContainer = styled.div`
	cursor: pointer;
	padding: 0.25vw 0 0.25vw 0.75vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${props =>
		props.isOnlyOneProjectVisible ? colors.PRIMARY : 'inherit'};
	border-right: ${props =>
		props.isOnlyOneProjectVisible ? '3px solid ' + colors.PRIMARY : 'none'};
	&:hover {
		color: ${colors.PRIMARY};
		border-right: 3px solid ${colors.PRIMARY};
		padding-right: calc(0.75vw - 3px);
	}
`

const DropdownProjectName = styled.div``
