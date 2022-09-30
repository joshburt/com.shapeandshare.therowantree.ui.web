import { Component } from 'react'
import './StatusPanel.css'
import Menu from './Menu'
import {
  FeatureDetailsType,
  FeatureType
} from 'rowantree.game.service.typescript.sdk'
import { Props } from './game.props'

class StatusPanel extends Component<Props> {
  buildStatusPanel (): any {
    const panelElements = []
    const menuBuilder: Menu = new Menu()

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderTopWithLabel('status', false, 15), 'div_event_StatusPanel_buildMenuBorderTop'))
    panelElements.push(menuBuilder.buildBreak('break_StatusPanel_buildMenuBorderTop'))

    if (this.props.state?.activeFeatureState === undefined) {
      panelElements.push(menuBuilder.buildMenuItem('Its dark.'))
      panelElements.push(menuBuilder.buildBreak('break_StatusPanel_nothing_todo'))
    } else {
      const name: FeatureType | '' = (this.props.state?.activeFeatureState.name !== undefined) ? this.props.state?.activeFeatureState.name : ''
      const details: FeatureDetailsType | '' = (this.props.state?.activeFeatureState.details !== undefined) ? this.props.state?.activeFeatureState.details : ''
      panelElements.push(menuBuilder.buildMenuItem(`${name}:${details}`))
      panelElements.push(menuBuilder.buildBreak('break_StatusPanel_active_feature_state_details'))
    }

    const active: boolean | undefined = this.props.state?.active
    switch (active) {
      case false:
        panelElements.push(menuBuilder.buildMenuItem('You are NOT active.'))
        panelElements.push(menuBuilder.buildBreak('break_' + String(active)))
        break
      case true:
        panelElements.push(menuBuilder.buildMenuItem('You are active'))
        panelElements.push(menuBuilder.buildBreak('break_' + String(active)))
        break
      default:
        panelElements.push(menuBuilder.buildMenuItem('You are dreaming..'))
        panelElements.push(menuBuilder.buildBreak('break_' + String(active)))
        break
    }

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderBottom(10), 'div_event_StatusPanel_buildMenuBorderBottom'))
    panelElements.push(menuBuilder.buildBreak('break_StatusPanel_buildMenuBorderBottom'))

    return panelElements
  }

  render (): any {
    return (
            <div className="StatusPanel" key="StatusPanel">
                {this.buildStatusPanel()}
            </div>
    )
  }
}

export default StatusPanel
