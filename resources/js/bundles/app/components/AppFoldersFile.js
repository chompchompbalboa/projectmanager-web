//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'

import { selectActiveFileId } from '../redux/active/activeSelectors'

import AppContentView from './AppContentView'
import File from './File'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeFileId: selectActiveFileId(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppFoldersFile = ({
  activeFileId
}) => {
  return (
    <AppContentView>
      <File
        key={activeFileId}
        fileId={activeFileId}/>
    </AppContentView>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppFoldersFile.propTypes = {
  activeFileId: string
}

export default connect(
  mapStateToProps
)(AppFoldersFile)