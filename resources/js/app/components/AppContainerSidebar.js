//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { colors, layout } from '../config'

import { selectCollectionIds, selectCollections } from '../redux/collection/collectionSelectors'
import { selectActiveContainer } from '../redux/container/containerSelectors'
import { selectActiveCollectionId } from '../redux/active/activeSelectors'

import AppContainerSidebarCollection from './AppContainerSidebarCollection'
import HiddenScrollbarContainer from './HiddenScrollbarContainer'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeCollectionId: selectActiveCollectionId(state),
  activeContainer: selectActiveContainer(state),
  collectionIds: selectCollectionIds(state),
  collections: selectCollections(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerSidebar = ({ 
  activeCollectionId, 
  activeContainer,
  collectionIds,
  collections
}) => {
  return (
    <Container>
      <ContainerName>
        {activeContainer.name}
      </ContainerName>
      <Collections>
        {collectionIds !== null && collectionIds.map(collectionId => (
          <AppContainerSidebarCollection
            key={collectionId}
            collection={collections[collectionId]}
            isActiveCollection={collectionId === activeCollectionId}/>
        ))}
      </Collections>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerSidebar.propTypes = {
  activeCollectionId: number,
  activeContainer: shape({
    name: string
  }),
  collectionIds: array,
  collections: object
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled(HiddenScrollbarContainer)`
  position: fixed;
  top: 0;
  left: ${ layout.SIDEBAR_WIDTH };
  width: ${ layout.CONTAINER_SIDEBAR_WIDTH };
  height: 100vh;
  background-color: ${ colors.CONTAINER_SIDEBAR_BACKGROUND };
  border-left: 0.5px dashed ${ colors.CONTAINER_SIDEBAR_BORDER };
`

const ContainerName = styled.h3`
  margin: 1vw 0 3vh calc(1vw + 3px);
  color: ${ colors.TEXT_WHITE };
  font-size: 18px;
`

const Collections = styled.div`
  width: 100%;
`

export default connect(
  mapStateToProps
)(withImmutablePropsToJS(AppContainerSidebar))