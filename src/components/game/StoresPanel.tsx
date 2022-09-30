import { Component } from 'react'
import './StoresPanel.css'
import {
  StoreType,
  UserStore
} from 'rowantree.game.service.typescript.sdk'
import Menu from './Menu'
import { Props } from './game.props'

class StoresPanel extends Component<Props> {
  public buildStoresPanel (): any[] {
    const menuBuilder: Menu = new Menu()

    const panelElements = []

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderTopWithLabel('Inventory', false, 15), 'div_event_StoresPanel_buildMenuBorderTop'))
    panelElements.push(menuBuilder.buildBreak('break_StoresPanel_buildMenuBorderTop'))

    if (this.props.state?.stores === undefined) {
      panelElements.push(menuBuilder.buildMenuItem('Your pockets are empty..'))
      panelElements.push(menuBuilder.buildBreak('break_StoresPanel_nothing_todo'))
    } else {
      for (const item in this.props.state.stores) {
        let storesString = ''
        const store: UserStore = this.props.state.stores[item as keyof typeof this.props.state.stores]
        const name: StoreType = store.name
        const amount: number = store.amount
        const description: string | undefined = store.description
        storesString = name + ' (' + String(amount) + ')'
        if (description != null) {
          storesString += ' (' + description + ')'
        }
        panelElements.push(menuBuilder.buildMenuItem(storesString))
        panelElements.push(menuBuilder.buildBreak('break_StoresPanel_' + item))
      }
    }
    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderBottom(10), 'div_event_StoresPanel_buildMenuBorderBottom'))
    panelElements.push(menuBuilder.buildBreak('break_StoresPanel_buildMenuBorderBottom'))

    return panelElements
  }

  public render (): any {
    return (
            <div className="StoresPanel">
                {this.buildStoresPanel()}
            </div>
    )
  }
}

export default StoresPanel
