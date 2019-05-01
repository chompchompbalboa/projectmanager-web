//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number, oneOf, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { selectActiveContent } from '../redux/active/activeSelectors'
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
  activeContent: selectActiveContent(state),
  activeView: selectActiveView(state),
  viewsCount: selectViewsCount(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentHeaderBreadcrumbs = ({
  activeCollection,
  activeContainer,
  activeContent,
  activeView,
  viewsCount
}) => {

  const breadcrumbsMap = {
    CONTAINER: [
      activeContainer ? activeContainer.name : null,
      activeCollection ? activeCollection.name : null,
      activeView && viewsCount > 1 ? activeView.name : null
    ].filter(breadcrumb => breadcrumb !== null),
    SETTINGS: [
      'Settings',
      'Structure'
    ]
  }

  const breadcrumbs = breadcrumbsMap[activeContent]

  return (
    <Container>
      {breadcrumbs.map((breadcrumb, index) => (
        <>
          <Breadcrumb>
            {breadcrumb}
          </Breadcrumb>
          {index < (breadcrumbs.length - 1) &&
            <Separator>&gt;</Separator>
          }
        </>
      ))}
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContentHeaderBreadcrumbs.propTypes = {
  activeCollection: shape({
    name: string
  }),
  activeContainer: shape({
    name: string
  }),
  activeContent: oneOf([
    'CONTAINER',
    'SETTINGS'
  ]),
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
  align-items: center;
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
)(withImmutablePropsToJS(AppContentHeaderBreadcrumbs))