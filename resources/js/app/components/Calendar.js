//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import moment from 'moment'
import ReactBigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { connect } from 'react-redux'

const localizer = ReactBigCalendar.momentLocalizer(moment)

//-----------------------------------------------------------------------------
// Redux
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  calendar: state.calendar
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class Calendar extends Component {

  render() {
    return (
      <ReactBigCalendar
        localizer={localizer}
        events={[]}/>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Calendar.propTypes = {
}


export default connect(
  mapStateToProps
)(Calendar)