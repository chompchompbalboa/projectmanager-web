//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, enums } from '../_config'

import AppBusiness from './content/AppBusiness'
import AppContent from './content/AppContent'
import AppMe from './content/AppMe'
import AppModal from './content/AppModal'
import AppProjects from './content/AppProjects'
import AppSettings from './content/AppSettings'
import AppSidebar from './content/AppSidebar'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeModal: state.modal.activeModal
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class App extends Component {
	state = {
    activeContent: 'PROJECTS',
    userId: userId
  }

  changeActiveContent = (nextActiveContent) => {
    this.setState({
      activeContent: nextActiveContent
    })
  }

	render() {
    const {
      activeModal
    } = this.props
    const { 
      activeContent,
      userId 
    } = this.state
    
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
            isActive={activeContent === 'PROJECTS'}
            userId={userId}/>
          <AppBusiness 
            isActive={activeContent === 'BUSINESS'}/>
          <AppSettings 
            isActive={activeContent === 'SETTINGS'}/>
        </AppContent>
        {activeModal !== null &&
          <AppModal
            activeModal={activeModal}/>
        }
      </Container>
    )
	}
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
App.propTypes = {
  activeModal: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
	z-index: 1000;
	color: ${colors.TEXT_DARK};
`

export default connect(
  mapStateToProps
)(App)
