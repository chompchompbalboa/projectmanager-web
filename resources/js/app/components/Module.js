//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, object, string } from 'prop-types'
import styled from 'styled-components'

import {
  getNote,
  getTable
} from '../../_api/queries'

import { selectModules } from '../redux/folder/folderSelectors'
import { setNote as setNoteAction } from '../redux/note/noteActions'
import { setTable as setTableAction } from '../redux/table/tableActions'

import Loading from './Loading'
import Note from './Note'
import Table from './Table'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  modules: selectModules(state)
})

const mapDispatchToProps = dispatch => ({
  setNote: nextNote => dispatch(setNoteAction(nextNote)),
  setTable: nextTable => dispatch(setTableAction(nextTable))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class Module extends Component {

  state = {
    isLoading: false
  }
  
  modules = {
    NOTE: {
      component: Note,
      get: getNote,
      set: this.props.setNote
    },
    TABLE: {
      component: Table,
      get: getTable,
      set: this.props.setTable
    }
  }

  componentDidMount = () => {
    this.getAndSetModule(this.props.moduleId)
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.moduleId !== this.props.moduleId) {
      this.setState({ loading: true })
      this.getAndSetModule(this.props.moduleId)
    }
  }

  getAndSetModule = (moduleId) => {
    if(moduleId !== null) {

      this.setState({
        isLoading: true
      })

      const {
        modules
      } = this.props
      const module = modules[moduleId]
      this.modules[module.type].get(module.typeId).then(moduleWithPayload => {
        this.modules[module.type].set(moduleWithPayload)
        this.setState({ isLoading: false })
      })
    }
  }

  render() {
    const {
      moduleId,
      modules
    } = this.props
    const {
      isLoading
    } = this.state

    const module = modules[moduleId] || null

    if (!isLoading && module && typeof this.modules[module.type] !== 'undefined') {
      const ModuleType = this.modules[module.type].component
      return (
        <ModuleType
          {...{ [module.type.toLowerCase()]: module.payload }}/> // Assign the correct prop name to the payload while passing it through
      )
    }
    if(isLoading) {
      return <Loading />
    }
    return (
      <Container>
        Select a module to get started
      </Container>
    )
  }
}

//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Module.propTypes = {
  moduleId: string,
  modules: object,
  setTable: func
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
)(Module)