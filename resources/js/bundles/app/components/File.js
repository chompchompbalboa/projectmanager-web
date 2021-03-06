//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, object, string } from 'prop-types'
import styled from 'styled-components'

import {
  getCalendar,
  getNote,
  getSheet
} from 'api/queries'

import { selectFiles } from '../redux/folder/folderSelectors'
import { setCalendar as setCalendarAction } from '../redux/calendar/calendarActions'
import { setNote as setNoteAction } from '../redux/note/noteActions'
import { setSheet as setSheetAction } from '../redux/sheet/sheetActions'

import Calendar from './Calendar'
import Loading from './Loading'
import Note from './Note'
import Sheet from './Sheet'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  files: selectFiles(state)
})

const mapDispatchToProps = dispatch => ({
  setCalendar: nextCalendar => dispatch(setCalendarAction(nextCalendar)),
  setNote: nextNote => dispatch(setNoteAction(nextNote)),
  setSheet: nextSheet => dispatch(setSheetAction(nextSheet))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class File extends Component {

  state = {
    isLoading: false
  }
  
  files = {
    CALENDAR: {
      component: Calendar,
      get: getCalendar,
      set: this.props.setCalendar
    },
    NOTE: {
      component: Note,
      get: getNote,
      set: this.props.setNote
    },
    SHEET: {
      component: Sheet,
      get: getSheet,
      set: this.props.setSheet
    }
  }

  componentDidMount = () => {
    this.getAndSetFile(this.props.fileId)
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.fileId !== this.props.fileId) {
      this.setState({ loading: true })
      this.getAndSetFile(this.props.fileId)
    }
  }

  getAndSetFile = (fileId) => {
    if(fileId !== null) {

      this.setState({
        isLoading: true
      })

      const {
        files
      } = this.props
      const file = files[fileId]
      this.files[file.type].get(file.typeId).then(fileWithPayload => {
        this.files[file.type].set(fileWithPayload)
        this.setState({ isLoading: false })
      })
    }
  }

  render() {
    const {
      fileId,
      files
    } = this.props
    const {
      isLoading
    } = this.state

    const file = files[fileId] || null

    if (!isLoading && file && typeof this.files[file.type] !== 'undefined') {
      const FileType = this.files[file.type].component
      return (
        <FileType />
      )
    }
    if(isLoading) {
      return <Loading />
    }
    return (
      <Container>
        Select a file to get started
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
File.propTypes = {
  fileId: string,
  files: object,
  setCalendar: func,
  setNote: func,
  setSheet: func
}

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(File)