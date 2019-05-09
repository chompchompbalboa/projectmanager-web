//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number, object } from 'prop-types'
import { connect } from 'react-redux'

import { 
  updateActiveSettingsStructureViewId as updateActiveSettingsStructureViewIdAction,
} from '../redux/active/activeActions'
import { 
  createStructureView as createStructureViewAction,
  deleteStructureView as deleteStructureViewAction,
  updateStructureView as updateStructureViewAction 
} from '../redux/structure/structureActions'

import { selectActiveSettingsStructureViewId, selectActiveSettingsStructureCollectionId } from '../redux/active/activeSelectors'
import { selectStructureViewIds, selectStructureViews } from '../redux/structure/structureSelectors'

import AppSettingsStructureColumn from './AppSettingsStructureColumn'
import AppSettingsStructureColumnItem from './AppSettingsStructureColumnItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeSettingsStructureViewId: selectActiveSettingsStructureViewId(state),
  activeSettingsStructureCollectionId: selectActiveSettingsStructureCollectionId(state),
  viewIds: selectStructureViewIds(state),
  views: selectStructureViews(state)
})

const mapDispatchToProps = dispatch => ({
  createStructureView: () => dispatch(createStructureViewAction()),
  deleteStructureView: viewId => dispatch(deleteStructureViewAction(viewId)),
  updateStructureView: (id, updates) => dispatch(updateStructureViewAction(id, updates)),
  updateActiveSettingsStructureViewId: nextActiveId => dispatch(updateActiveSettingsStructureViewIdAction(nextActiveId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureViews = ({
  activeSettingsStructureViewId,
  activeSettingsStructureCollectionId,
  viewIds,
  views,
  deleteStructureView,
  updateActiveSettingsStructureViewId,
  updateStructureView,
}) => {
  return (
    <AppSettingsStructureColumn
      hasBorder={activeSettingsStructureCollectionId !== null}>
      {activeSettingsStructureCollectionId !== null && viewIds.map(viewId => {
        const view = views[viewId]
        return (
          <AppSettingsStructureColumnItem 
            key={view.id}
            deleteItem={deleteStructureView}
            icon={view.icon}
            id={view.id}
            isActive={view.id === activeSettingsStructureViewId}
            onClick={() => updateActiveSettingsStructureViewId(view.id)}
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
  viewIds: array,
  views: object,
  deleteStructureView: func,
  updateActiveSettingsStructureViewId: func,
  updateStructureView: func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettingsStructureViews)