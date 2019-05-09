//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, func, number, object } from 'prop-types'
import { connect } from 'react-redux'

import { 
  updateActiveSettingsStructureContainerId as updateActiveSettingsStructureContainerIdAction,
} from '../redux/active/activeActions'
import { 
  createStructureContainer as createStructureContainerAction,
  deleteStructureContainer as deleteStructureContainerAction,
  updateStructureContainer as updateStructureContainerAction 
} from '../redux/structure/structureActions'

import { selectActiveSettingsStructureContainerId } from '../redux/active/activeSelectors'
import { selectContainerIds } from '../redux/container/containerSelectors'
import { selectStructureContainers } from '../redux/structure/structureSelectors'

import AppSettingsStructureColumn from './AppSettingsStructureColumn'
import AppSettingsStructureColumnItem from './AppSettingsStructureColumnItem'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeSettingsStructureContainerId: selectActiveSettingsStructureContainerId(state),
  containerIds: selectContainerIds(state),
  containers: selectStructureContainers(state)
})

const mapDispatchToProps = dispatch => ({
  createStructureContainer: () => dispatch(createStructureContainerAction()),
  deleteStructureContainer: containerId => dispatch(deleteStructureContainerAction(containerId)),
  updateStructureContainer: (id, updates) => dispatch(updateStructureContainerAction(id, updates)),
  updateActiveSettingsStructureContainerId: nextActiveId => dispatch(updateActiveSettingsStructureContainerIdAction(nextActiveId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureContainers = ({
  activeSettingsStructureContainerId,
  containerIds,
  containers,
  deleteStructureContainer,
  updateActiveSettingsStructureContainerId,
  updateStructureContainer,
}) => {
  return (
    <AppSettingsStructureColumn>
      {containerIds.map(containerId => {
        const container = containers[containerId]
        return (
          <AppSettingsStructureColumnItem 
            key={container.id}
            deleteItem={deleteStructureContainer}
            icon={container.icon}
            id={container.id}
            isActive={container.id === activeSettingsStructureContainerId}
            onClick={() => updateActiveSettingsStructureContainerId(container.id)}
            name={container.name}
            type="CONTAINER"
            updateItem={updateStructureContainer}/>
        )
        }
      )}
    </AppSettingsStructureColumn>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureContainers.propTypes = {
  activeSettingsStructureContainerId: number,
  containerIds: array,
  containers: object,
  deleteStructureContainer: func,
  updateActiveSettingsStructureContainerId: func,
  updateStructureContainer: func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSettingsStructureContainers)