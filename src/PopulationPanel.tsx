import { Component } from 'react'
import './PopulationPanel.css'
import {
  FeatureType,
  IncomeSourceType,
  StoreType,
  UserFeatureState, UserIncome,
  UserNotification,
  UserStore
} from 'rowantree.service.typescript.sdk'
import Menu from './Menu'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  model: {
    active: boolean
    stores: Record<StoreType, UserStore> | undefined
    incomes: Record<IncomeSourceType, UserIncome> | undefined
    features: Set<FeatureType> | undefined
    activeFeatureState: UserFeatureState | undefined
    population: number | undefined
    merchants: Set<StoreType> | undefined
    notifications: UserNotification[] | undefined
  }
}

class PopulationPanel extends Component<Props> {
  public buildPanel (): any[] {
    const menuBuilder: Menu = new Menu()
    const panelElements: any[] = []

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderTopWithLabel('population', false, 15), 'div_event_PopulationPanel_buildMenuBorderTop'))
    panelElements.push(menuBuilder.buildBreak('break_PopulationPanel_buildMenuBorderTop'))

    let popString = 0
    if (this.props.model.population !== undefined) {
      popString = this.props.model.population
    }
    panelElements.push(menuBuilder.buildMenuItem(String(popString)))
    panelElements.push(menuBuilder.buildBreak('break_PopulationPanel_population'))

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderBottom(10), 'div_event_PopulationPanel_buildMenuBorderBottom'))
    panelElements.push(menuBuilder.buildBreak('break_StatusPanel_buildMenuBorderBottom'))

    return panelElements
  }

  public render (): any {
    return (
            <div className="PopulationPanel">
                {this.buildPanel()}
            </div>
    )
  }
}

export default PopulationPanel
