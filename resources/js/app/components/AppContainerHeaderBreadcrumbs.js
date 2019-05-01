//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { selectActiveCollection } from '../redux/collection/collectionSelectors'
import { selectActiveContainer } from '../redux/container/containerSelectors'
import { selectActiveView, selectViewsCount } from '../redux/view/viewSelectors'

import { colors } from '../config'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  activeCollection: selectActiveCollection(state),
  activeContainer: selectActiveContainer(state),
  activeView: selectActiveView(state),
  viewsCount: selectViewsCount(state),
})

const mapDispatchToProps = dispatch => ({
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContainerHeaderBreadcrumbs = ({
  activeCollection,
  activeContainer,
  activeView,
  viewsCount
}) => {
  if (activeContainer && activeCollection && activeView) {
    return (
      <Container>
        <Breadcrumb>
          {activeContainer.name}
        </Breadcrumb>
        <Separator>
        >
        </Separator>
        <Breadcrumb>
          {activeCollection.name}
        </Breadcrumb>
        {viewsCount > 1 && 
          <>
            <Separator>
            >
            </Separator>
            <Breadcrumb>
              {activeView.name}
            </Breadcrumb>
          </>
        }
      </Container>
    )
  }
  return null
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContainerHeaderBreadcrumbs.propTypes = {
  activeCollection: shape({
    name: string
  }),
  activeContainer: shape({
    name: string
  }),
  activeView: shape({
    name: string
  }),
  settingsContainerId: number,
  updateActiveContainerId: func,
  viewsCount: number
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
`

const Breadcrumb = styled.div`
  cursor: pointer;
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
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(AppContainerHeaderBreadcrumbs))