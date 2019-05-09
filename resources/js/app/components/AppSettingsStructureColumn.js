//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'

import { colors, layout } from '../config'

import HiddenScrollbarContainer from './HiddenScrollbarContainer'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureColumn = ({ 
  children, 
  hasBorder,
  width
}) => {
  return (
    <Container
      hasBorder={hasBorder}
      width={width}>
      {children}
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureColumn.propTypes = {
  hasBorder: bool,
  width: string
}

AppSettingsStructureColumn.defaultProps = {
  hasBorder: true,
  width: '17%'
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled(HiddenScrollbarContainer)`
  width: ${ props => props.width };
  height: calc(100vh - ${ layout.CONTAINER_HEADER_HEIGHT });
  overflow-y: scroll;
  border-right: 1px dashed ${ props => props.hasBorder ? colors.SETTINGS_STRUCTURE_COLUMN_BORDER : 'transparent' };
`

export default AppSettingsStructureColumn