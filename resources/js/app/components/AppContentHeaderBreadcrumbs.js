//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, number, oneOf, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'


import { 
  updateActiveSettingsContent as updateActiveSettingsContentAction 
} from '../redux/active/activeActions'

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

const mapDispatchToProps = dispatch => ({
  updateActiveSettingsContent: nextActiveSettingsContent => dispatch(updateActiveSettingsContentAction(nextActiveSettingsContent))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentHeaderBreadcrumbs = ({
  activeCollection,
  activeContainer,
  activeContent,
  activeView,
  updateActiveSettingsContent,
  viewsCount
}) => {

  const breadcrumbsMap = {
    CONTAINER: [
      activeContainer ? activeContainer.name : null,
      activeCollection ? activeCollection.name : null,
      activeCollection && activeView && viewsCount > 1 ? activeView.name : null
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
        <React.Fragment
           key={index}>
          <Breadcrumb
            onClick={() => updateActiveSettingsContent('STRUCTURE')}>
            {breadcrumb}
          </Breadcrumb>
          {index < (breadcrumbs.length - 1) &&
            <Separator>&gt;</Separator>
          }
        </React.Fragment>
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
  updateActiveSettingsContent: func,
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
  mapDispatchToProps
)(withImmutablePropsToJS(AppContentHeaderBreadcrumbs))