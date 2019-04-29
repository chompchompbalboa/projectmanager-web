//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types' 
import styled, { keyframes } from 'styled-components'

import { colors } from '../config'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Loading = ({ height, width }) => {
  return (
    <Container
      height={height}
      width={width}>
      <Dot />
      <Dot />
      <Dot />
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

const scaleDown = keyframes`
  0%, 80%, 100%{
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  40%{
    -webkit-transform: scale(1);
            transform: scale(1);
  }
`

const Dot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: ${ colors.TEXT_WHITE };
  position: relative;
  animation: 1.2s ${ scaleDown } ease-in-out infinite;
  &:nth-child(2){
    margin: 0 15px;
    animation: 1.2s ${ scaleDown } ease-in-out infinite .2s;
  }
  &:nth-child(3){
    animation: 1.2s ${ scaleDown } ease-in-out infinite .4s;
}
`

export default Loading
