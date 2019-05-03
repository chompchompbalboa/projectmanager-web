//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { selectStructureViews } from '../redux/structure/structureSelectors'

import AppSettingsStructureView, { AddView } from './AppSettingsStructureView'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  views: selectStructureViews(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructureCollection extends Component {

  state = {
    isViewsVisible: false
  }
  
  render() {
    const {
      collection,
      views
    } = this.props
    const {
      isViewsVisible
    } = this.state
    return (
      <Container>
        <Collection
          onClick={() => this.setState({ isViewsVisible: !isViewsVisible})}>
          <Bullet>
            {isViewsVisible ? "-" : "+"}
          </Bullet>
          <Name>
            {collection.name}
          </Name>
        </Collection>
        <Views
          isViewsVisible={isViewsVisible}>
          {views && views !== null && collection.views && collection.views.map(viewId => (
            <AppSettingsStructureView
              key={viewId}
              view={views[viewId]}/>
          ))}
          <AddView />
        </Views>
      </Container>
    )
  }
}

export const AddCollection = () => (
  <Collection>
    <Bullet/>
    <Name>
      Add...
    </Name>
  </Collection>
)

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
AppSettingsStructureCollection.propTypes = {
  collection: shape({
    name: string,
    views: array
  }),
  views: object
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const Collection = styled.div`
  margin-left: 1vw;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Bullet = styled.h3`
  min-height: 1px;
  width: 1.5vw;
  display: flex;
  align-items: center;
`

const Name = styled.h3`
  &:hover {
    text-decoration: underline;
  }
`

const Views = styled.div`
  display: ${ props => props.isViewsVisible ? 'block' : 'none'};
`

export default connect(
  mapStateToProps
)(withImmutablePropsToJS(AppSettingsStructureCollection))