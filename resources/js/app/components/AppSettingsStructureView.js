//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { 
  createStructureView as createStructureViewAction,
  deleteStructureView as deleteStructureViewAction,
  updateStructureView as updateStructureViewAction 
} from '../redux/structure/structureActions'
import { selectStructureModules } from '../redux/structure/structureSelectors'

import AppSettingsStructureModule, { AddModule } from './AppSettingsStructureModule'

import ContentEditable from './ContentEditable'
import DeleteDropdown from './DeleteDropdown'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  modules: selectStructureModules(state)
})

const mapDispatchToProps = dispatch => ({
  createStructureView: (containerId, collectionId) => dispatch(createStructureViewAction(containerId, collectionId)),
  deleteStructureView: (collectionId, viewId) => dispatch(deleteStructureViewAction(collectionId, viewId)),
  updateStructureView: (id, updates) => dispatch(updateStructureViewAction(id, updates))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructureView extends Component {


  state = {
    isViewRenaming: this.props.view.isViewRenaming ? this.props.view.isViewRenaming : false,
    isModulesVisible: false,
    isDeleteDropdownVisible: false,
    isActionsDropdownVisible: false,
    viewName: this.props.view.name
  }

  handleNameBlur = () => {
    const {
      view,
      updateStructureView
    } = this.props
    const {
      viewName
    } = this.state
    this.setState({ isViewRenaming: false })
    updateStructureView(view.id, {
      name: viewName
    })
  }

  handleNameClick = () => {
    const {
      isModulesVisible
    } = this.state
    this.setState({ isModulesVisible: !isModulesVisible })
  }

  render() {
    const {
      collectionId,
      containerId,
      deleteStructureView,
      modules,
      view
    } = this.props
    const {
      isActionsDropdownVisible,
      isViewRenaming,
      isDeleteDropdownVisible,
      isModulesVisible,
      viewName
    } = this.state
    return (
      <Container>
        <View>
          <Bullet>
            {isModulesVisible ? "-" : "+"}
          </Bullet>
          <Name
            focus
            editable={isViewRenaming}
            isViewRenaming={isViewRenaming}
            onBlur={() => this.handleNameBlur()}
            onChange={(e, value) => this.setState({ viewName: value })}
            onClick={!isViewRenaming ? () => this.handleNameClick() : null}
            tagName="h4"
            value={viewName}/>
          {isModulesVisible &&
            <SettingsContainer
              onClick={() => this.setState({ isActionsDropdownVisible: !isActionsDropdownVisible })}>
              <Ellipsis>
                ...
              </Ellipsis>
              <Dropdown
                closeDropdown={() => this.setState({ isActionsDropdownVisible: false })}
                isDropdownVisible={isActionsDropdownVisible}>
                <DropdownItem
                  onClick={() => this.setState({ isViewRenaming: true })}
                  text="Rename"/>
                <DropdownItem
                  onClick={() => this.setState({ isDeleteDropdownVisible: true })}
                  text="Delete"/>
              </Dropdown>
            <DeleteDropdown
              onDelete={() => deleteStructureView(collectionId, view.id)}
              closeDropdown={() => this.setState({ isDeleteDropdownVisible: false })}
              isDropdownVisible={isDeleteDropdownVisible}
              textToMatch={view.name}
              type="view"/>
            </SettingsContainer>
          }
        </View>
        <Modules
          isModulesVisible={isModulesVisible}>
          {modules && modules !== null && view.modules && view.modules.map(moduleId => (
            <AppSettingsStructureModule
              key={moduleId}
              module={modules[moduleId]}/>
          ))}
          <AddModule/>
        </Modules>
      </Container>
    )
  }
}

export const AddViewComponents = ({
  collectionId,
  createStructureView
}) => (
  <View
    onClick={() => createStructureView(collectionId)}>
    <Bullet/>
    <Name
      editable={false}
      tagName="h4"
      value="Add..."/>
  </View>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureView.propTypes = {
  view: shape({
    name: string,
    modules: array
  }),
  modules: object
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  margin: 0.35vh 0;
`

const View = styled.div`
  cursor: pointer;
  margin-left: 3vw;
  display: flex;
  align-items: center;
`

const Bullet = styled.h4`
  min-height: 1px;
  width: 1.5vw;
  display: flex;
  align-items: center;
`

const Name = styled(ContentEditable)`
  cursor: pointer;
  &:hover {
    text-decoration: ${ props => props.isViewRenaming ? 'none' : 'underline'};
  }
`

const SettingsContainer = styled.div`
`

const Ellipsis = styled.h3`
  cursor: pointer;
  margin-left: 0.25vw;
  letter-spacing: 0.1rem;
  &:hover {
    text-decoration: underline;
  }
`

const Modules = styled.div`
  display: ${ props => props.isModulesVisible ? 'block' : 'none'};
`

const sharedConnector = component => connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(component))

export const AddView = sharedConnector(AddViewComponents)
export default sharedConnector(AppSettingsStructureView)