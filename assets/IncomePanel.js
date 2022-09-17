import React, { Component } from 'react'
import './IncomePanel.css'

class IncomePanel extends Component {
  addWorker (textual_source_name) {
    this.props.model.updateUserIncomeSourceAllotment(textual_source_name, 1)
  }

  removeWorker (textual_source_name) {
    this.props.model.updateUserIncomeSourceAllotment(textual_source_name, -1)
  }

  buildAddButton (textual_source_name, label, key_suffix) {
    let element_key = ''
    element_key += key_suffix + '_' + label
    return (<button key={element_key} onClick={(e) => this.addWorker(textual_source_name)}>{label}</button>)
  }

  buildRemoveButton (textual_source_name, label, key_suffix) {
    let element_key = ''
    element_key += key_suffix + '_' + label
    return (<button key={element_key} onClick={(e) => this.removeWorker(textual_source_name)}>{label}</button>)
  }

  buildIncome () {
    const panelElements = []

    panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderTopWithLabel('workers', false, 15), 'div_event_IncomePanel_buildMenuBorderTop'))
    panelElements.push(this.props.menu.buildBreak('break_IncomePanel_buildMenuBorderTop'))

    if (this.props.model.incomes != null) {
      for (const key in this.props.model.incomes) {
        let incomeString = ''
        const income_obj = this.props.model.incomes[key]
        const name = income_obj.name
        const amount = income_obj.amount
        const description = income_obj.description
        incomeString += name + ' (' + amount + ')'
        if (description != null) {
          incomeString += ' (' + description + ')'
        }

        panelElements.push(this.props.menu.buildMenuItem(incomeString, false, 10))
        panelElements.push(this.buildAddButton(name, '+', name))
        panelElements.push(this.buildRemoveButton(name, '-', name))
        panelElements.push(this.props.menu.buildBreak('break_IncomePanel_incomeString_' + incomeString))
      }
    }

    panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderBottom(10), 'div_event_IncomePanel_buildMenuBorderBottom'))
    panelElements.push(this.props.menu.buildBreak('break_IncomePanel_buildMenuBorderBottom'))

    return panelElements
  }

  render () {
    return (
            <div key="IncomePanel" className="IncomePanel">
                {this.buildIncome()}
            </div>
    )
  }
}

export default IncomePanel
