//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { 
  createStructureCollection as createStructureCollectionAction,
  deleteStructureCollection as deleteStructureCollectionAction,
  updateStructureCollection as updateStructureCollectionAction 
} from '../redux/structure/structureActions'
import { selectStructureViews } from '../redux/structure/structureSelectors'

import AppSettingsStructureView, { AddView } from './AppSettingsStructureView'

import ContentEditable from './ContentEditable'
import DeleteDropdown from './DeleteDropdown'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  views: selectStructureViews(state)
})

const mapDispatchToProps = dispatch => ({
  createStructureCollection: containerId => dispatch(createStructureCollectionAction(containerId)),
  deleteStructureCollection: (containerId, collectionId) => dispatch(deleteStructureCollectionAction(containerId, collectionId)),
  updateStructureCollection: (id, updates) => dispatch(updateStructureCollectionAction(id, updates))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructureCollection extends Component {

  state = {
    collectionName: this.props.collection.name,
    isCollectionRenaming: this.props.collection.isCollectionRenaming ? this.props.collection.isCollectionRenaming : false, 
    isViewsVisible: false,
    isDeleteDropdownVisible: false,
    isActionsDropdownVisible: false,
  }

  handleNameBlur = () => {
    const {
      collection,
      updateStructureCollection
    } = this.props
    const {
      collectionName
    } = this.state
    this.setState({ isCollectionRenaming: false })
    updateStructureCollection(collection.id, {
      name: collectionName
    })
  }

  handleNameClick = () => {
    const {
      isViewsVisible
    } = this.state
    this.setState({ isViewsVisible: !isViewsVisible })
  }
  
  render() {
    const {
      collection,
      containerId, 
      deleteStructureCollection,
      views
    } = this.props
    const {
      collectionName,
      isActionsDropdownVisible,
      isCollectionRenaming,
      isDeleteDropdownVisible,
      isViewsVisible
    } = this.state
    return (
      <Container>
        <Collection>
          <Name
            focus={isCollectionRenaming}
            editable={isCollectionRenaming}
            isCollectionRenaming={isCollectionRenaming}
            onBlur={() => this.handleNameBlur()}
            onChange={(e, value) => this.setState({ collectionName: value })}
            onClick={!isCollectionRenaming ? () => this.handleNameClick() : null}
            tagName="h3"
            value={collectionName}/>
          {isViewsVisible &&
            <SettingsContainer
              onClick={() => this.setState({ isActionsDropdownVisible: !isActionsDropdownVisible })}>
              <Ellipsis>
                ...
              </Ellipsis>
              <Dropdown
                closeDropdown={() => this.setState({ isActionsDropdownVisible: false })}
                isDropdownVisible={isActionsDropdownVisible}>
                <DropdownItem
                  onClick={() => this.setState({ isCollectionRenaming: true })}
                  text="Rename"/>
                <DropdownItem
                  onClick={() => this.setState({ isDeleteDropdownVisible: true })}
                  text="Delete"/>
              </Dropdown>
            <DeleteDropdown
              onDelete={() => deleteStructureCollection(containerId, collection.id)}
              closeDropdown={() => this.setState({ isDeleteDropdownVisible: false })}
              isDropdownVisible={isDeleteDropdownVisible}
              textToMatch={collection.name}
              type="collection"/>
            </SettingsContainer>
          }
        </Collection>
        <Views
          isViewsVisible={isViewsVisible}>
          {views && views !== null && collection.views && collection.views.map(viewId => (
            <AppSettingsStructureView
              key={viewId}
              collectionId={collection.id}
              containerId={containerId}
              view={views[viewId]}/>
          ))}
          <AddView
            collectionId={collection.id}/>
        </Views>
      </Container>
    )
  }
}

const AddCollectionComponents = ({
  containerId,
  createStructureCollection
}) => {
  return (
    <Collection
      onClick={() => createStructureCollection(containerId)}>
      <Name
        editable={false}
        tagName="h3"
        value="Add..."/>
    </Collection>
  )
}

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
AppSettingsStructureCollection.propTypes = {
  collection: shape({
    name: string,
    views: array
  }),
  containerId: number,
  deleteStructureCollection: func,
  updateStructureCollection: func,
  views: object
}

AddCollectionComponents.propTypes = {
  containerId: number,
  createStructureCollection: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const Collection = styled.div`
  margin-left: 3vw;
  display: flex;
  align-items: center;
`

const Name = styled(ContentEditable)`
  cursor: pointer;
  &:hover {
    text-decoration: ${ props => props.isCollectionRenaming ? 'none' : 'underline'};
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

const Views = styled.div`
  display: ${ props => props.isViewsVisible ? 'block' : 'none'};
`
const sharedConnector = component => connect(
  mapStateToProps,
  mapDispatchToProps
)(component)

export const AddCollection = sharedConnector(AddCollectionComponents)
export default sharedConnector(AppSettingsStructureCollection)