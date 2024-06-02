import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//import M_ModuleHeader from '../components/M_ModuleHeader.jsx'
//import TabImageSet from '../components/TabImageSet.jsx'
import M_Control from '../controls/M_Control.jsx'

export default class M_ObjectsContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tabsLock: this.props.objects.locked
    }
  }

  handleToggle = (item, setStore) => {
    
    if (item == 'lockTabs') {
      setStore(item, !this.state.tabsLock)
      this.setState({
        tabsLock: !this.state.tabsLock
      })
    }
  };

  render() {
    const { setImageStore, objects, handleTabClickObject } = this.props
    
    return <div className="M_ObjectsContent">
      
        <M_Control
          orientation='column'
          hasTitle={true}
          title='Choose a collection'
          controlType='TabImageSet'
        //lock
          isLocked={this.state.tabsLock}
          setStore={setImageStore}
          item='lockTabs'
          handleToggle={this.handleToggle}
        //data
          data={objects.currentCollection}
          options = {objects.preset}
          handleChange = {handleTabClickObject}
          images={objects.tabBackgrounds}
        />
    </div>
  }
}
