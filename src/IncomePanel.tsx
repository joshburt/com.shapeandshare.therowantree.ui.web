import { Component } from 'react'
import './IncomePanel.css'
import { FeatureType, StoreType, UserFeatureState, UserNotification, UserStore } from 'rowantree.service.typescript.sdk'

import RowanTreeServiceClient from './services/game.service'
import Menu from './Menu'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  model: {
    active: boolean
    stores: Record<StoreType, UserStore> | undefined
    incomes: Record<StoreType, UserStore> | undefined
    features: Set<FeatureType> | undefined
    activeFeatureState: UserFeatureState | undefined
    population: number | undefined
    merchants: Set<StoreType> | undefined
    notifications: UserNotification[] | undefined
  }
}

class IncomePanel extends Component<Props> {
  public addWorker (storeType: StoreType): void {
    RowanTreeServiceClient.userIncomeSet(storeType, 1).then(() => {
    }, error => {
      console.log(JSON.stringify(error))
    })
  }

  public removeWorker (storeType: StoreType): void {
    RowanTreeServiceClient.userIncomeSet(storeType, -1).then(() => {
    }, error => {
      console.log(JSON.stringify(error))
    })
  }

  public buildAddButton (storeType: StoreType, label: string, keySuffix: string): any {
    let elementKey: string = ''
    elementKey += keySuffix + '_' + label
    return (<button key={elementKey} onClick={(e) => this.addWorker(storeType)}>{label}</button>)
  }

  public buildRemoveButton (storeType: StoreType, label: string, keySuffix: string): any {
    let elementKey: string = ''
    elementKey += keySuffix + '_' + label
    return (<button key={elementKey} onClick={(e) => this.removeWorker(storeType)}>{label}</button>)
  }

  public buildIncome (): any[] {
    const menuBuilder: Menu = new Menu()

    const panelElements: any[] = []

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderTopWithLabel('workers', false, 15), 'div_event_IncomePanel_buildMenuBorderTop'))
    panelElements.push(menuBuilder.buildBreak('break_IncomePanel_buildMenuBorderTop'))

    if (this.props.model.incomes != null) {
      for (const item in this.props.model.incomes) {
        let incomeString: string = ''
        const userStore: UserStore = this.props.model.incomes[item as keyof typeof this.props.model.incomes]
        const name: StoreType = userStore.name
        const amount: number = userStore.amount
        const description: string | undefined = userStore.description
        incomeString += name + ' (' + String(amount) + ')'
        if (description !== undefined) {
          incomeString += ' (' + description + ')'
        }

        panelElements.push(menuBuilder.buildMenuItem(incomeString, false, 10))
        panelElements.push(this.buildAddButton(name, '+', name))
        panelElements.push(this.buildRemoveButton(name, '-', name))
        panelElements.push(menuBuilder.buildBreak('break_IncomePanel_incomeString_' + incomeString))
      }
    }

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderBottom(10), 'div_event_IncomePanel_buildMenuBorderBottom'))
    panelElements.push(menuBuilder.buildBreak('break_IncomePanel_buildMenuBorderBottom'))

    return panelElements
  }

  public render (): any {
    return (
            <div key="IncomePanel" className="IncomePanel">
                {this.buildIncome()}
            </div>
    )
  }
}

export default IncomePanel
