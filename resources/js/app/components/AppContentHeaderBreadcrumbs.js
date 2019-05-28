//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectActiveFolderPath } from '../redux/active/activeSelectors'
import { selectFolders, selectModules } from '../redux/folder/folderSelectors'

import { colors } from '../config'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeFolderPath: selectActiveFolderPath(state),
  folders: selectFolders(state),
  modules: selectModules(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentHeaderBreadcrumbs = ({
  activeFolderPath,
  folders,
  modules
}) => {
  return (
    <Container>
      {activeFolderPath && activeFolderPath.map((activeId, index) => {
        const breadcrumb = folders[activeId] ? folders[activeId] : modules[activeId]
        return (
          <React.Fragment
            key={activeId}>
            <Breadcrumb>
              {breadcrumb.name}
            </Breadcrumb>
            {index < (activeFolderPath.length - 1) &&
              <Separator>&gt;</Separator>
            }
          </React.Fragment>
      )})}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContentHeaderBreadcrumbs.propTypes = {
  activeFolderPath: array,
  folders: object,
  modules: object
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  align-items: center;
`

const Breadcrumb = styled.div`
  cursor: default;
  margin-top: 1px;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid ${ colors.TEXT_WHITE};
  }
`

const Separator = styled.div`
  margin: 0 0.5rem;
`

export default connect(
  mapStateToProps
)(AppContentHeaderBreadcrumbs)