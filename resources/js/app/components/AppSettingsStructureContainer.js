//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { 
  createStructureContainer as createStructureContainerAction,
  deleteStructureContainer as deleteStructureContainerAction,
  updateStructureContainer as updateStructureContainerAction 
} from '../redux/structure/structureActions'
import { selectStructureCollections } from '../redux/structure/structureSelectors'

import AppSettingsStructureCollection, { AddCollection } from './AppSettingsStructureCollection'
import ChangeIconDropdown from './ChangeIconDropdown'
import ContentEditable from './ContentEditable'
import DeleteDropdown from './DeleteDropdown'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import Icon from './Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  collections: selectStructureCollections(state)
})

const mapDispatchToProps = dispatch => ({
  createStructureContainer: () => dispatch(createStructureContainerAction()),
  deleteStructureContainer: containerId => dispatch(deleteStructureContainerAction(containerId)),
  updateStructureContainer: (id, nextContainer) => dispatch(updateStructureContainerAction(id, nextContainer))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructureContainer extends Component {

  state = {
    containerName: this.props.container.name,
    isActionsDropdownVisible: false,
    isCollectionsVisible: false,
    isContainerRenaming: this.props.container.isContainerRenaming ? this.props.container.isContainerRenaming : false,
    isDeleteDropdownVisible: false,
    isIconDropdownVisible: false
  }

  handleNameBlur = () => {
    const {
      container,
      updateStructureContainer
    } = this.props
    const {
      containerName
    } = this.state
    this.setState({ isContainerRenaming: false })
    updateStructureContainer(container.id, {
      name: containerName
    })
  }

  handleNameClick = () => {
    const {
      isCollectionsVisible
    } = this.state
    this.setState({ isCollectionsVisible: !isCollectionsVisible })
  }

  render() {
    const {
      collections,
      container,
      deleteStructureContainer,
      updateStructureContainer
    } = this.props
    const {
      containerName,
      isActionsDropdownVisible,
      isCollectionsVisible,
      isContainerRenaming,
      isDeleteDropdownVisible,
      isIconDropdownVisible
    } = this.state
    return (
      <Container>
        <ContainerInfo>
          <IconContainer>
            <Icon 
              icon={container.icon}/>
          </IconContainer>
          <Name
            focus
            editable={isContainerRenaming}
            isContainerRenaming={isContainerRenaming}
            onBlur={() => this.handleNameBlur()}
            onChange={(e, value) => this.setState({ containerName: value })}
            onClick={!isContainerRenaming ? () => this.handleNameClick() : null}
            tagName="h2"
            value={containerName}/>
          {isCollectionsVisible &&
            <SettingsContainer
              onClick={() => this.setState({ isActionsDropdownVisible: !isActionsDropdownVisible })}>
              <Ellipsis>
                ...
              </Ellipsis>
              <Dropdown
                closeDropdown={() => this.setState({ isActionsDropdownVisible: false })}
                isDropdownVisible={isActionsDropdownVisible}>
                <DropdownItem
                  onClick={() => this.setState({ isContainerRenaming: true })}
                  text="Rename"/>
                <DropdownItem
                  onClick={() => this.setState({ isIconDropdownVisible: true })}
                  text="Change Icon"/>
                <DropdownItem
                  onClick={() => this.setState({ isDeleteDropdownVisible: true })}
                  text="Delete"/>
              </Dropdown>
            <ChangeIconDropdown
              onIconClick={nextIcon => updateStructureContainer(container.id, { icon: nextIcon })}
              closeDropdown={() => this.setState({ isIconDropdownVisible: false })}
              isDropdownVisible={isIconDropdownVisible}/>
            <DeleteDropdown
              onDelete={() => deleteStructureContainer(container.id)}
              closeDropdown={() => this.setState({ isDeleteDropdownVisible: false })}
              isDropdownVisible={isDeleteDropdownVisible}
              textToMatch={container.name}
              type="container"/>
            </SettingsContainer>
          }
        </ContainerInfo>
        <Collections
          isCollectionsVisible={isCollectionsVisible}>
          {collections && collections !== null && container.collections.map(collectionId => (
            <AppSettingsStructureCollection 
              key={collectionId}
              collection={collections[collectionId]}
              containerId={container.id}/>
          ))}
          <AddCollection
            containerId={container.id}/>
        </Collections>
      </Container>
    )
  }
}

export const AddContainerComponents = ({
  createStructureContainer
}) => (
  <ContainerInfo
    onClick={() => createStructureContainer()}>
    <Icon 
      icon="ADD"/>
    <Name
      editable={false}
      tagName="h2"
      value="Add..."/>
  </ContainerInfo>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureContainer.propTypes = {
  addContainer: func,
  deleteContainer: func,
  collections: object,
  container: shape({
    collections: array,
    name: string
  }),
  deleteStructureContainer: func,
  updateStructureContainer: func
}

AddContainerComponents.propTypes = {
  createStructureContainer: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const IconContainer = styled.div`
`

const ContainerInfo = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled(ContentEditable)`
  margin-left: 1vw;
  cursor: pointer;
  &:hover {
    text-decoration: ${ props => props.isContainerRenaming ? 'none' : 'underline'};
  }
`

const SettingsContainer = styled.div`
`

const Ellipsis = styled.h2`
  cursor: pointer;
  margin-left: 0.25vw;
  letter-spacing: 0.1rem;
  &:hover {
    text-decoration: underline;
  }
`

const Collections = styled.div`
  display: ${ props => props.isCollectionsVisible ? 'block' : 'none'};
`

const sharedConnector = component => connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(component))

export const AddContainer = sharedConnector(AddContainerComponents)
export default sharedConnector(AppSettingsStructureContainer)