//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import { colors, enums } from './config'

import AppBusiness from './content/AppBusiness'
import AppContent from './content/AppContent'
import AppMe from './content/AppMe'
import AppProjects from './content/AppProjects'
import AppSettings from './content/AppSettings'
import AppSidebar from './content/AppSidebar'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class App extends Component {
	state = {
    activeContent: 'PROJECTS'
  }

  changeActiveContent = (nextActiveContent) => {
    this.setState({
      activeContent: nextActiveContent
    })
  }

	render() {
    const { activeContent } = this.state
		return (
        <Container>
          <AppSidebar
            activeContent={activeContent}
            activeContentChoices={enums.CONTENT}
            changeActiveContent={this.changeActiveContent}/>
          <AppContent>
            <AppMe 
              isActive={activeContent === 'ME'}/>
            <AppProjects 
              isActive={activeContent === 'PROJECTS'}/>
            <AppBusiness 
              isActive={activeContent === 'BUSINESS'}/>
            <AppSettings 
              isActive={activeContent === 'SETTINGS'}/>
          </AppContent>
        </Container>
    )
	}
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	z-index: 1000;
	color: ${colors.TEXT_DARK};
`

export default App
