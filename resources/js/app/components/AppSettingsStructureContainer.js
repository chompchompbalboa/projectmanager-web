//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import withImmutablePropsToJS from 'with-immutable-props-to-js'

import { selectStructureCollections } from '../redux/structure/structureSelectors'

import AppSettingsStructureCollection, { AddCollection } from './AppSettingsStructureCollection'
import Icon from './Icon'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  collections: selectStructureCollections(state)
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class AppSettingsStructureContainer extends Component {

  state = {
    isCollectionsVisible: false
  }

  render() {
      const {
      collections,
      container
    } = this.props
    const {
      isCollectionsVisible
    } = this.state
    return (
      <Container>
        <ContainerInfo>
          <Icon 
            icon={container.icon}/>
          <Name
            onClick={() => this.setState({ isCollectionsVisible: !isCollectionsVisible})}>
            {container.name}
          </Name>
        </ContainerInfo>
        <Collections
          isCollectionsVisible={isCollectionsVisible}>
          {collections && collections !== null && container.collections.map(collectionId => (
            <AppSettingsStructureCollection 
              key={collectionId}
              collection={collections[collectionId]}/>
          ))}
          <AddCollection />
        </Collections>
      </Container>
    )
  }
}

export const AddContainer = () => (
  <ContainerInfo>
    <Icon 
      icon="ADD"/>
    <Name>
      Add...
    </Name>
  </ContainerInfo>
)

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppSettingsStructureContainer.propTypes = {
  collections: object,
  container: shape({
    collections: array,
    name: string
  })
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

const ContainerInfo = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.h2`
  margin-left: 1vw;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const Collections = styled.div`
  display: ${ props => props.isCollectionsVisible ? 'block' : 'none'};
`

export default connect(
  mapStateToProps
)(withImmutablePropsToJS(AppSettingsStructureContainer))