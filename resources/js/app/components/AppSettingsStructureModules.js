//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number, object } from 'prop-types'
import { connect } from 'react-redux'

import { 
  updateActiveSettingsStructureModuleId as updateActiveSettingsStructureModuleIdAction,
} from '../redux/active/activeActions'
import { 
  createStructureModule as createStructureModuleAction,
  deleteStructureModule as deleteStructureModuleAction,
  updateStructureModule as updateStructureModuleAction 
} from '../redux/structure/structureActions'

import { selectActiveSettingsStructureModuleId, selectActiveSettingsStructureViewId } from '../redux/active/activeSelectors'
import { selectStructureModuleIds, selectStructureModules } from '../redux/structure/structureSelectors'

import AppSettingsStructureColumn from './AppSettingsStructureColumn'
import AppSettingsStructureColumnItem from './AppSettingsStructureColumnItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeSettingsStructureModuleId: selectActiveSettingsStructureModuleId(state),
  activeSettingsStructureViewId: selectActiveSettingsStructureViewId(state),
  moduleIds: selectStructureModuleIds(state),
  modules: selectStructureModules(state)
})

const mapDispatchToProps = dispatch => ({
  createStructureModule: () => dispatch(createStructureModuleAction()),
  deleteStructureModule: moduleId => dispatch(deleteStructureModuleAction(moduleId)),
  updateStructureModule: (id, updates) => dispatch(updateStructureModuleAction(id, updates)),
  updateActiveSettingsStructureModuleId: nextActiveId => dispatch(updateActiveSettingsStructureModuleIdAction(nextActiveId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureModules = ({
  activeSettingsStructureModuleId,
  activeSettingsStructureViewId,
  createStructureModule,
  deleteStructureModule,
  moduleIds,
  modules,
  updateActiveSettingsStructureModuleId,
  updateStructureModule,
}) => {
  return (
    <AppSettingsStructureColumn
      addItem={createStructureModule}
      isDropdownsRightAligned={true}
      isVisible={activeSettingsStructureViewId !== null}
      header="Modules"
      hasBorder={false}
      width="51%">
      {activeSettingsStructureViewId !== null && moduleIds.map(moduleId => {
        const module = modules[moduleId]
        return (
          <AppSettingsStructureColumnItem 
            key={module.id}
            deleteItem={deleteStructureModule}
            icon={module.icon}
            id={module.id}
            isActive={module.id === activeSettingsStructureModuleId}
            isDropdownsRightAligned={true}
            onClick={() => updateActiveSettingsStructureModuleId(module.id)}
            name={module.type + " - " + module.id}
            type="VIEW"
            updateItem={updateStructureModule}/>
        )
        }
      )}
    </AppSettingsStructureColumn>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureModules.propTypes = {
  activeSettingsStructureModuleId: number,
  activeSettingsStructureViewId: number,
  createStructureModule: func,
  deleteStructureModule: func,
  moduleIds: array,
  modules: object,
  updateActiveSettingsStructureModuleId: func,
  updateStructureModule: func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettingsStructureModules)