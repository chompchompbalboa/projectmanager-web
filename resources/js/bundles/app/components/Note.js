//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, string } from 'prop-types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Note.css' // Custom styling for react-quill
import { connect } from 'react-redux'
import styled from 'styled-components'

import { updateNote as updateNoteAction } from '../redux/note/noteActions'
import { selectNoteValue } from '../redux/note/noteSelectors'

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  noteValue: selectNoteValue(state)
})

const mapDispatchToProps = dispatch => ({
  updateNote: updates => dispatch(updateNoteAction(updates))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class Note extends Component {

  render() {
    const {
      noteValue,
      updateNote
    } = this.props
    return (
      <Container>
        <ReactQuill
          onChange={nextValue => updateNote({ value: nextValue })}
          value={noteValue}/>
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Note.propTypes = {
  noteValue: string,
  updateNote: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: 100%;
`


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note)