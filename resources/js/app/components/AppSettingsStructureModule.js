//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import AppSettingsStructureModuleAddModule from './AppSettingsStructureModuleAddModule'
import DeleteDropdown from './DeleteDropdown'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapDispatchToProps = dispatch => ({
  //createStructureModule: (containerId, collectionId) => dispatch(createStructureModuleAction(containerId, collectionId)),
  //deleteStructureModule: (collectionId, viewId) => dispatch(deleteStructureModuleAction(collectionId, viewId)),
  //updateStructureModule: (id, updates) => dispatch(updateStructureModuleAction(id, updates))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructureModule extends Component {

  state = {
    isActionsDropdownVisible: false,
    isDeleteDropdownVisible: false
  }
  
  render() {
    const {
      deleteStructureModule,
      module,
      viewId
    } = this.props
    const {
      isActionsDropdownVisible,
      isDeleteDropdownVisible
    } = this.state

    return (
      <Container
        onClick={() => this.setState({ isActionsDropdownVisible: !isActionsDropdownVisible})}>
        {module.type} - {module.typeId}
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
          onDelete={() => deleteStructureModule(viewId, module.id)}
          closeDropdown={() => this.setState({ isDeleteDropdownVisible: false })}
          isDropdownVisible={isDeleteDropdownVisible}
          textToMatch={module.name}
          type="module"/>
      </Container>
    )
  }
}

const AddModuleComponents = () => (
  <AppSettingsStructureModuleAddModule />
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureModule.propTypes = {
  deleteStructureModule: func,
  module: shape({
    type: string,
    typeId: number
  }),
  viewId: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.h5`
  margin-left: 7vw;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`


const sharedConnector = component => connect(
  null,
  mapDispatchToProps
)(withImmutablePropsToJS(component))

export const AddModule = sharedConnector(AddModuleComponents)
export default sharedConnector(AppSettingsStructureModule)