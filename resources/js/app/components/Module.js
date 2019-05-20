//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, object, string } from 'prop-types'

import {
  getTable
} from '../../_api/queries'

import { selectModules } from '../redux/folder/folderSelectors'
import { setTable as setTableAction } from '../redux/table/tableActions'

import Loading from './Loading'
import Table from './Table'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const mapStateToProps = state => ({
  modules: selectModules(state)
})

const mapDispatchToProps = dispatch => ({
  setTable: nextTable => dispatch(setTableAction(nextTable))
})

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
class Module extends Component {

  state = {
    isLoading: true
  }
  
  modules = {
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
    const {
      modules
    } = this.props
    const module = modules[moduleId]
    this.modules[module.type].get(module.typeId).then(moduleWithPayload => {
      this.modules[module.type].set(moduleWithPayload)
      this.setState({ isLoading: false })
    })
  }

  render() {
    const {
      moduleId,
      modules
    } = this.props
    const {
      isLoading
    } = this.state

    const module = modules[moduleId]

    if (!isLoading && typeof this.modules[module.type] !== 'undefined') {
      const ModuleType = this.modules[module.type].component
      return (
        <ModuleType
          {...{ [module.type.toLowerCase()]: module.payload }}/> // Assign the correct prop name to the payload while passing it through
      )
    }
    return <Loading />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Module)