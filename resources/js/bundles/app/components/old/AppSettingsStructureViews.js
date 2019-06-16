//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number, object } from 'prop-types'
import { connect } from 'react-redux'

import { 
  updateActiveContainerId as updateActiveContainerIdAction,
  updateActiveSettingsStructureViewId as updateActiveSettingsStructureViewIdAction,
} from '../redux/active/activeActions'
import { 
  createStructureView as createStructureViewAction,
  deleteStructureView as deleteStructureViewAction,
  updateStructureView as updateStructureViewAction 
} from '../redux/structure/structureActions'

import { selectActiveSettingsStructureViewId, selectActiveSettingsStructureCollectionId, selectActiveSettingsStructureContainerId } from '../redux/active/activeSelectors'
import { selectStructureViewIds, selectStructureViews } from '../redux/structure/structureSelectors'

import AppSettingsStructureColumn from './AppSettingsStructureColumn'
import AppSettingsStructureColumnItem from './AppSettingsStructureColumnItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeSettingsStructureViewId: selectActiveSettingsStructureViewId(state),
  activeSettingsStructureCollectionId: selectActiveSettingsStructureCollectionId(state),
  activeSettingsStructureContainerId: selectActiveSettingsStructureContainerId(state),
  viewIds: selectStructureViewIds(state),
  views: selectStructureViews(state)
})

const mapDispatchToProps = dispatch => ({
  createStructureView: () => dispatch(createStructureViewAction()),
  deleteStructureView: viewId => dispatch(deleteStructureViewAction(viewId)),
  updateActiveContainerId: (containerId, collectionId, viewId) => dispatch(updateActiveContainerIdAction(containerId, collectionId, viewId)),
  updateStructureView: (id, updates) => dispatch(updateStructureViewAction(id, updates)),
  updateActiveSettingsStructureViewId: nextActiveId => dispatch(updateActiveSettingsStructureViewIdAction(nextActiveId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureViews = ({
  activeSettingsStructureCollectionId,
  activeSettingsStructureContainerId,
  activeSettingsStructureViewId,
  createStructureView,
  deleteStructureView,
  updateActiveContainerId,
  updateActiveSettingsStructureViewId,
  updateStructureView,
  viewIds,
  views
}) => {
  return (
    <AppSettingsStructureColumn
      addItem={createStructureView}
      header="Views"
      isVisible={activeSettingsStructureCollectionId !== null}>
      {activeSettingsStructureCollectionId !== null && viewIds.map(viewId => {
        const view = views[viewId]
        return (
          <AppSettingsStructureColumnItem 
            key={view.id}
            deleteItem={deleteStructureView}
            icon={view.icon}
            id={view.id}
            isActive={view.id === activeSettingsStructureViewId}
            isItemRenaming={view.isViewRenaming}
            onClick={() => updateActiveSettingsStructureViewId(view.id)}
            onGoToItem={() => updateActiveContainerId(activeSettingsStructureContainerId, activeSettingsStructureCollectionId, view.id)}
            name={view.name}
            type="VIEW"
            updateItem={updateStructureView}/>
        )
        }
      )}
    </AppSettingsStructureColumn>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureViews.propTypes = {
  activeSettingsStructureViewId: number,
  activeSettingsStructureCollectionId: number,
  activeSettingsStructureContainerId: number,
  createStructureView: func,
  deleteStructureView: func,
  updateActiveContainerId: func,
  updateActiveSettingsStructureViewId: func,
  updateStructureView: func,
  viewIds: array,
  views: object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettingsStructureViews)