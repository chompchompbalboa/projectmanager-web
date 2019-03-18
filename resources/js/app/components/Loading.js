//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types' 
import styled, { keyframes } from 'styled-components'

import { colors } from '../../_config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Loading = ({ height, width }) => {
  return (
    <Container
      height={height}
      width={width}>
      <LoadingIcon/>
    </Container>
  )
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Loading.propTypes = {
  height: string,
  width: string
}

Loading.defaultProps = {
  height: '100%',
  width: '100%'
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
`

const spinLoadingIcon = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingIcon = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;
  &:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid ${ colors.PRIMARY };
    border-color: ${ colors.PRIMARY } transparent ${ colors.PRIMARY } transparent;
    animation: ${ spinLoadingIcon } 1.2s linear infinite;
  }
`

export default Loading
