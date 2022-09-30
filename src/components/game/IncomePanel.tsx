import { Component } from 'react'
import './IncomePanel.css'
import {
  IncomeSourceType,
  UserIncome
} from 'rowantree.game.service.typescript.sdk'

import RowanTreeServiceClient from '../../services/game.service'
import Menu from './Menu'
import { Props } from './game.props'

class IncomePanel extends Component<Props> {
  public addWorker (type: IncomeSourceType): void {
    RowanTreeServiceClient.userIncomeSet(type, 1).then(() => {
    }, error => {
      console.log(JSON.stringify(error))
    })
  }

  public removeWorker (type: IncomeSourceType): void {
    RowanTreeServiceClient.userIncomeSet(type, -1).then(() => {
    }, error => {
      console.log(JSON.stringify(error))
    })
  }

  public buildAddButton (type: IncomeSourceType, label: string, keySuffix: string): any {
    let elementKey: string = ''
    elementKey += keySuffix + '_' + label
    return (<button key={elementKey} onClick={(e) => this.addWorker(type)}>{label}</button>)
  }

  public buildRemoveButton (type: IncomeSourceType, label: string, keySuffix: string): any {
    let elementKey: string = ''
    elementKey += keySuffix + '_' + label
    return (<button key={elementKey} onClick={(e) => this.removeWorker(type)}>{label}</button>)
  }

  public buildIncome (): any[] {
    const menuBuilder: Menu = new Menu()

    const panelElements: any[] = []

    panelElements.push(menuBuilder.buildLabel(menuBuilder.buildMenuBorderTopWithLabel('workers', false, 15), 'div_event_IncomePanel_buildMenuBorderTop'))
    panelElements.push(menuBuilder.buildBreak('break_IncomePanel_buildMenuBorderTop'))

    if (this.props.state?.incomes !== undefined) {
      for (const item in this.props.state?.incomes) {
        let incomeString: string = ''
        const income: UserIncome = this.props.state.incomes[item as keyof typeof this.props.state.incomes]
        const name: IncomeSourceType = income.name
        const amount: number = income.amount
        const description: string | undefined = income.description
        incomeString += name + ' (' + String(amount) + ')'
        if (description != null) {
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
