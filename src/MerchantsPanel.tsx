import { Component } from 'react'
import './MerchantsPanel.css'
import {
  FeatureType,
  IncomeSourceType,
  StoreType,
  UserFeatureState, UserIncome,
  UserNotification,
  UserStore
} from 'rowantree.game.service.typescript.sdk'
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

class MerchantsPanel extends Component<Props> {
  public buildButton (storeType: StoreType, label: string, keySuffix: string): any {
    let elementKey: string = ''
    elementKey += keySuffix + '_' + label
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return (<button key={elementKey} onClick={async () => {
      RowanTreeServiceClient.merchantTransform(storeType).then(() => {
      }, error => {
        console.log(JSON.stringify(error))
      })
    }}>{label}</button>)
  }

  public buildMerchantsPanel (): any {
    const menuBuilder: Menu = new Menu()
    const panelElements = []

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderTopWithLabel('Merchants', false, 15), 'div_event_MerchantsPanel_buildMenuBorderTop'))
    panelElements.push(menuBuilder.buildBreak('break_MerchantsPanel_buildMenuBorderTop'))

    if (this.props.model?.merchants === undefined) {
      panelElements.push(menuBuilder.buildMenuItem('You are a lone figure at the trading grounds.'))
      panelElements.push(menuBuilder.buildMenuItem('The wind your only company.'))
      panelElements.push(menuBuilder.buildBreak('break_MerchantsPanel_nothing_todo'))
    } else {
      this.props.model.merchants.forEach((element) => {
        // const name = element.name
        panelElements.push(menuBuilder.buildMenuItem(''))
        panelElements.push(this.buildButton(element, element, element))
        panelElements.push(menuBuilder.buildBreak('break_MerchantsPanel_' + element))
      })
    }

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderBottom(10), 'div_event_MerchantsPanel_buildMenuBorderBottom'))
    panelElements.push(menuBuilder.buildBreak('break_MerchantsPanel_buildMenuBorderBottom'))

    return panelElements
  }

  render (): any {
    return (
            <div key="MerchantsPanel" className="MerchantsPanel">
                {this.buildMerchantsPanel()}
            </div>
    )
  }
}

export default MerchantsPanel
