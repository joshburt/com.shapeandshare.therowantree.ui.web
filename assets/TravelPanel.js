import React, { Component } from 'react'
import './TravelPanel.css'

class TravelPanel extends Component {
  buildButton (location, label, key_suffix) {
    let element_key = ''
    element_key += key_suffix + '_' + label
    return (<button key={element_key} onClick={(e) => this.props.model.transportUser(location)}>{label}</button>)
  }

  buildTravel () {
    const panelElements = []

    panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderTopWithLabel('travel', false, 15), 'div_event_TravelPanel_buildMenuBorderTop'))
    panelElements.push(this.props.menu.buildBreak('break_TravelPanel_buildMenuBorderTop'))

    if (this.props.model.features == null) {
      panelElements.push(this.props.menu.buildMenuItem('You are nowhere..', 'div_event_TravelPanel_active_feature'))
      panelElements.push(this.props.menu.buildBreak('break_event_TravelPanel_active_feature'))
    } else {
      for (const key in this.props.model.features) {
        const feature_obj = this.props.model.features[key]
        const name = feature_obj.name

        // panelElements.push(this.props.menu.buildLabel('| ', name));
        if (this.props.model.activeFeature === name) {
          panelElements.push(this.props.menu.buildMenuItem(feature_name, 'div_event_TravelPanel_feature_' + name))
        } else {
          panelElements.push(this.buildButton(name, name, name))
        }
        panelElements.push(this.props.menu.buildBreak('break_event_TravelPanel_feature' + name))
      }
    }

    panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderBottom(10), 'div_event_TravelPanel_buildMenuBorderBottom'))
    panelElements.push(this.props.menu.buildBreak('break_TravelPanel_buildMenuBorderBottom'))

    return panelElements
  }

  render () {
    return (
            <div className="TravelPanel">
                {this.buildTravel()}
            </div>
    )
  }
}

export default TravelPanel
