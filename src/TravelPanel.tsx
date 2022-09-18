import { Component } from 'react'
import './TravelPanel.css'
import {
  FeatureType,
  IncomeSourceType,
  StoreType,
  UserFeatureState, UserIncome,
  UserNotification,
  UserStore
} from 'rowantree.service.typescript.sdk'
import Menu from './Menu'
import RowanTreeServiceClient from './services/game.service'

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

class TravelPanel extends Component<Props> {
  public buildButton (location: FeatureType, label: string, keySuffix: string): any {
    let elementKey = ''
    elementKey += keySuffix + '_' + label
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return (<button key={elementKey} onClick={async () => {
      RowanTreeServiceClient.userTransport(location).then(() => {
      }, error => {
        console.log(JSON.stringify(error))
      })
    }}>{label}</button>)
  }

  public buildTravel (): any[] {
    const menuBuilder: Menu = new Menu()

    const panelElements: any[] = []

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderTopWithLabel('travel', false, 15), 'div_event_TravelPanel_buildMenuBorderTop'))
    panelElements.push(menuBuilder.buildBreak('break_TravelPanel_buildMenuBorderTop'))

    if (this.props.model.features == null) {
      panelElements.push(menuBuilder.buildMenuItem('You are nowhere..'))
      panelElements.push(menuBuilder.buildBreak('break_event_TravelPanel_active_feature'))
    } else {
      this.props.model.features.forEach((element) => {
        // panelElements.push(this.props.menu.buildLabel('| ', name));
        if (this.props.model.activeFeatureState?.name === element) {
          panelElements.push(menuBuilder.buildMenuItem(element))
        } else {
          panelElements.push(this.buildButton(element, element, element))
        }
        panelElements.push(menuBuilder.buildBreak('break_event_TravelPanel_feature' + element))
      })
    }

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderBottom(10), 'div_event_TravelPanel_buildMenuBorderBottom'))
    panelElements.push(menuBuilder.buildBreak('break_TravelPanel_buildMenuBorderBottom'))

    return panelElements
  }

  render (): any {
    return (
            <div className="TravelPanel">
                {this.buildTravel()}
            </div>
    )
  }
}

export default TravelPanel
