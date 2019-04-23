//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, enums } from '../_config'

import { 
  updateActiveContent as updateActiveContentAction
} from './redux/view/viewActions'

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
  activeContent: state.view.activeContent,
  activeModal: state.modal.activeModal
})

const mapDispatchToProps = dispatch => ({
  updateActiveContent: nextActiveContent => dispatch(updateActiveContentAction(nextActiveContent))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class App extends Component {
  
	state = {
    userId: userId
  }

  contentComponents = {
    ME: AppMe,
    PROJECTS: AppProjects,
    BUSINESS: AppBusiness,
    SETTINGS: AppSettings
  }

  changeActiveContent = (nextActiveContent) => {
    const {
      updateActiveContent
    } = this.props
    updateActiveContent(nextActiveContent)
  }

	render() {
    const {
      activeContent,
      activeModal
    } = this.props
    const { 
      userId 
    } = this.state
    
    const ContentComponent = this.contentComponents[activeContent]

		return (
      <Container>
        <AppSidebar
          activeContent={activeContent}
          activeContentChoices={enums.CONTENT}
          changeActiveContent={this.changeActiveContent}/>
        <AppContent>
          <ContentComponent
            userId={userId}/>
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
  mapStateToProps,
  mapDispatchToProps
)(App)
