//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../config'

import {
  updateActiveModuleId as updateActiveModuleIdAction
} from '../redux/active/activeActions'
import {
  deleteModule as deleteModuleAction,
  updateModule as updateModuleAction
} from '../redux/folder/folderActions'
import { selectActiveModuleId } from '../redux/active/activeSelectors'

import AppFoldersSidebarModuleDropdowns from './AppFoldersSidebarModuleDropdowns'
import ContentEditable from './ContentEditable'
import Icon from './Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeModuleId: selectActiveModuleId(state)
})

const mapDispatchToProps = dispatch => ({
  deleteModule: (moduleId) => dispatch(deleteModuleAction(moduleId)),
  updateActiveModuleId: nextActiveModuleId => dispatch(updateActiveModuleIdAction(nextActiveModuleId)),
  updateModule: (moduleId, updates) => dispatch(updateModuleAction(moduleId, updates))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppFoldersSidebarModule extends Component {
  
  state = {
    dropdownLeft: null,
    dropdownTop: null,
    isDeleteDropdownVisible: false,
    isDropdownVisible: false,
    isModuleRenaming: this.props.module.isModuleRenaming || false,
    moduleName: this.props.module.name
  }

  closeDropdowns = () => {
    this.setState({
      isDeleteDropdownVisible: false,
      isDropdownVisible: false
    })
  }

  handleModuleNameBlur = () => {
    const {
      module,
      updateModule
    } = this.props
    const {
      moduleName
    } = this.state
    updateModule(module.id, { name: moduleName })
    this.setState({ isModuleRenaming: false })
  }


  handleModuleInfoContextMenu = e => {
    e.preventDefault()
    this.setState({
      dropdownLeft: e.pageX + 'px',
      dropdownTop: e.pageY + 'px',
      isDropdownVisible: true
    })
  }

  render() {
    const {
      activeModuleId,
      deleteModule,
      level,
      module,
      updateActiveModuleId
    } = this.props
    const {
      dropdownLeft,
      dropdownTop,
      isDeleteDropdownVisible,
      isDropdownVisible,
      isModuleRenaming,
      moduleName
    } = this.state
    return (
      <Container>
        <ModuleInfo
          level={level}
          isActiveModule={activeModuleId === module.id}
          onClick={() => updateActiveModuleId(module.id)}
          onContextMenu={e => this.handleModuleInfoContextMenu(e)}>
          <Icon
            icon={"MODULE_" + module.type}
            size="0.9rem"/>
          <ModuleName
              focus={isModuleRenaming}
              editable={isModuleRenaming}
              id={module.id}
              isModuleRenaming={isModuleRenaming}
              onBlur={() => this.handleModuleNameBlur()}
              onChange={(e, value) => this.setState({ moduleName: value })}
              value={moduleName}/>
        </ModuleInfo>
        <AppFoldersSidebarModuleDropdowns 
          closeDropdowns={this.closeDropdowns}
          deleteModule={() => deleteModule(module.id)}
          dropdownLeft={dropdownLeft}
          dropdownTop={dropdownTop}
          moduleName={module.name}
          isDeleteDropdownVisible={isDeleteDropdownVisible}
          isDropdownVisible={isDropdownVisible}
          openDeleteDropdown={() => this.setState({ isDropdownVisible: false, isDeleteDropdownVisible: true })}
          toggleModuleIsRenaming={() => this.setState({ isDropdownVisible: false, isModuleRenaming: !isModuleRenaming })}/>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppFoldersSidebarModule.propTypes = {
  activeModuleId: string,
  level: number,
  module: shape({
    id: string,
    name: string,
    type: string,
    isModuleRenaming: bool
  }),
  updateActiveModuleId: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;
`

const ModuleInfo = styled.div`
  padding: 0.25rem;
  padding-left: ${ props => (props.level / 2) + 'rem' };
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  background-color: ${ props => props.isActiveModule ? colors.SIDEBAR_BACKGROUND_ACTIVE : 'transparent' };
  &:hover {
    background-color: ${ colors.SIDEBAR_BACKGROUND_ACTIVE };
  }
`

const ModuleName = styled(ContentEditable)`
  margin-left: 0.25rem;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppFoldersSidebarModule)