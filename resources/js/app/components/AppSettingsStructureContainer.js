//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { selectStructureCollections } from '../redux/structure/structureSelectors'

import AppSettingsStructureCollection from './AppSettingsStructureCollection'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  collections: selectStructureCollections(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppSettingsStructureContainer = ({
  collections,
  container
}) => {
  return (
    <Container>
      {container.name}
      {collections && collections !== null && container.collections.map(collectionId => (
        <AppSettingsStructureCollection 
          key={collectionId}
          collection={collections[collectionId]}/>
      ))}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureContainer.propTypes = {
  name: string
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default connect(
  mapStateToProps
)(withImmutablePropsToJS(AppSettingsStructureContainer))