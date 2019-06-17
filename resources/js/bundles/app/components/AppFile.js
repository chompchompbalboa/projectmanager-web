//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors, layout } from '../config'

import { selectActiveFileId } from '../redux/active/activeSelectors'

import HiddenScrollbarContainer from './HiddenScrollbarContainer'
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
const AppFile = ({
  activeFileId
}) => {
  return (
    <Container>
      <File
        key={activeFileId}
        fileId={activeFileId}/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppFile.propTypes = {
  activeFileId: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled(HiddenScrollbarContainer)`
  position: fixed;
  z-index: 1;
  top: ${ layout.HEADER_HEIGHT };
  left: ${ layout.SIDEBAR_WIDTH };
  width: calc(100vw - ${ layout.SIDEBAR_WIDTH });
  height calc(100vh - ${ layout.HEADER_HEIGHT });
  background-color: ${ colors.MODULE_BACKGROUND };
  border-top-left-radius: 5px;
`

export default connect(
  mapStateToProps
)(AppFile)