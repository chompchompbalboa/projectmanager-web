//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, object } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../config'

import { selectFolderIds, selectFolders, selectFiles } from '../redux/folder/folderSelectors'

import Logo from 'components/Logo'
import AppSidebarFolder from './AppSidebarFolder'
import HiddenScrollbarContainer from './HiddenScrollbarContainer'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  folderIds: selectFolderIds(state),
  folders: selectFolders(state),
  files: selectFiles(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSidebar = ({
  folderIds,
  folders,
  files
}) => (
  <Container>
    <Header>
      <Logo
        alignItems="flex-start"
        fontSize="1.3rem"/>
    </Header>
    <Folders>
      {folderIds !== null && folderIds.map(folderId => (
        <AppSidebarFolder
          key={folderId}
          folder={folders[folderId]}
          folderPath={[folderId]}
          folders={folders}
          level={1}
          files={files}/>
      ))}
    </Folders>
  </Container>
)

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled(HiddenScrollbarContainer)`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: ${ layout.SIDEBAR_WIDTH };
  height: 100vh;
  background-color: ${ colors.SIDEBAR_BACKGROUND };
  color: ${ colors.TEXT_WHITE };
  overflow-x: hidden;
  overflow-y: scroll;
  text-overflow: ellipsis;
`

const Header = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  padding: 1rem;
  background-color: ${ colors.SIDEBAR_BACKGROUND };
`

const Folders = styled.div`
  position: relative;
  width: 100%;
  min-height: 25%;
  display: flex;
  flex-direction: column;
`

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSidebar.propTypes = {
  folderIds: array,
  folders: object,
  files: object
}

export default connect(
  mapStateToProps
)(AppSidebar)