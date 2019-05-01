//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { array, bool, func, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { colors } from '../config'

import { selectActiveViewId } from '../redux/active/activeSelectors'
import { selectViewIds, selectViews, selectViewsCount } from '../redux/view/viewSelectors'
import { 
  updateActiveCollectionId as updateActiveCollectionIdAction 
} from '../redux/active/activeActions'

import AppContainerSidebarCollectionView from './AppContainerSidebarCollectionView'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeViewId: selectActiveViewId(state),
  viewIds: selectViewIds(state),
  views: selectViews(state),
  viewsCount: selectViewsCount(state),
})

const mapDispatchToProps = dispatch => ({
  updateActiveCollectionId: nextActiveCollectionId => dispatch(updateActiveCollectionIdAction(nextActiveCollectionId))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerSidebarCollection = ({ 
  activeViewId,
  collection: {
    id,
    name
  },
  viewIds,
  views,
  isActiveCollection,
  updateActiveCollectionId,
  viewsCount
}) => {
  return (
    <Container>
      <CollectionName
        isActiveCollection={isActiveCollection}
        onClick={() => updateActiveCollectionId(id)}>
        {name}
      </CollectionName>
      {(isActiveCollection && viewsCount > 1) &&
        <Views>
          {viewIds !== null && viewIds.map(viewId => (
            <AppContainerSidebarCollectionView
              key={viewId}
              isActiveView={viewId === activeViewId}
              view={views[viewId]}/>
          ))}
        </Views>
      }
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerSidebarCollection.propTypes = {
  activeViewId: number,
  collection: shape({
    id: number,
    name: string
  }),
  isActiveCollection: bool,
  viewIds: array,
  views: object,
  updateActiveCollectionId: func
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
`

const CollectionName = styled.div`
  cursor: pointer;
  padding: 0.9vh 1vw;
  width: 100%;
  text-overflow: ellipsis;
  color: ${ props => props.isActiveCollection ? colors.TEXT_WHITE : colors.TEXT_WHITE_INACTIVE };
  background-color: ${ props => props.isActiveCollection ? colors.CONTAINER_SIDEBAR_BACKGROUND_ACTIVE : colors.CONTAINER_SIDEBAR_BACKGROUND_INACTIVE };
  border-left: 3px solid ${ props => props.isActiveCollection ? colors.CONTAINER_SIDEBAR_BORDER_ACTIVE : colors.CONTAINER_SIDEBAR_BORDER_INACTIVE };
  &:hover {
    background-color: ${ colors.CONTAINER_SIDEBAR_BACKGROUND_ACTIVE};
  }
`

const Views = styled.div`
  width: 100%;
  background-color: ${ colors.CONTAINER_SIDEBAR_VIEWS_BACKGROUND};
  border-left: 3px solid ${ colors.CONTAINER_SIDEBAR_BORDER_ACTIVE };
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(AppContainerSidebarCollection))