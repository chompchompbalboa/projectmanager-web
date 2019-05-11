//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number, object } from 'prop-types'
import { connect } from 'react-redux'

import { 
  updateActiveContainerId as updateActiveContainerIdAction,
  updateActiveSettingsStructureCollectionId as updateActiveSettingsStructureCollectionIdAction,
} from '../redux/active/activeActions'
import { 
  createStructureCollection as createStructureCollectionAction,
  deleteStructureCollection as deleteStructureCollectionAction,
  updateStructureCollection as updateStructureCollectionAction 
} from '../redux/structure/structureActions'

import { selectActiveSettingsStructureCollectionId, selectActiveSettingsStructureContainerId } from '../redux/active/activeSelectors'
import { selectStructureCollectionIds, selectStructureCollections } from '../redux/structure/structureSelectors'

import AppSettingsStructureColumn from './AppSettingsStructureColumn'
import AppSettingsStructureColumnItem from './AppSettingsStructureColumnItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeSettingsStructureCollectionId: selectActiveSettingsStructureCollectionId(state),
  activeSettingsStructureContainerId: selectActiveSettingsStructureContainerId(state),
  collectionIds: selectStructureCollectionIds(state),
  collections: selectStructureCollections(state)
})

const mapDispatchToProps = dispatch => ({
  createStructureCollection: () => dispatch(createStructureCollectionAction()),
  deleteStructureCollection: collectionId => dispatch(deleteStructureCollectionAction(collectionId)),
  updateStructureCollection: (id, updates) => dispatch(updateStructureCollectionAction(id, updates)),
  updateActiveContainerId: (containerId, collectionId) => dispatch(updateActiveContainerIdAction(containerId, collectionId)),
  updateActiveSettingsStructureCollectionId: nextActiveId => dispatch(updateActiveSettingsStructureCollectionIdAction(nextActiveId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureCollections = ({
  activeSettingsStructureCollectionId,
  activeSettingsStructureContainerId,
  collectionIds,
  collections,
  createStructureCollection,
  deleteStructureCollection,
  updateActiveContainerId,
  updateActiveSettingsStructureCollectionId,
  updateStructureCollection,
}) => {
  return (
    <AppSettingsStructureColumn
      addItem={createStructureCollection}
      header="Collections"
      isVisible={activeSettingsStructureContainerId !== null}>
      {activeSettingsStructureContainerId !== null && collectionIds.map(collectionId => {
        const collection = collections[collectionId]
        return (
          <AppSettingsStructureColumnItem 
            key={collection.id}
            deleteItem={deleteStructureCollection}
            icon={collection.icon}
            id={collection.id}
            isActive={collection.id === activeSettingsStructureCollectionId}
            isItemRenaming={collection.isCollectionRenaming}
            onClick={() => updateActiveSettingsStructureCollectionId(collection.id)}
            onGoToItem={() => updateActiveContainerId(activeSettingsStructureContainerId, collection.id)}
            name={collection.name}
            type="COLLECTION"
            updateItem={updateStructureCollection}/>
        )
        }
      )}
    </AppSettingsStructureColumn>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureCollections.propTypes = {
  activeSettingsStructureCollectionId: number,
  activeSettingsStructureContainerId: number,
  collectionIds: array,
  collections: object,
  createStructureCollection: func,
  deleteStructureCollection: func,
  updateActiveContainerId: func,
  updateActiveSettingsStructureCollectionId: func,
  updateStructureCollection: func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettingsStructureCollections)