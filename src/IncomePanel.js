import React, { Component } from 'react';
import './IncomePanel.css';

class IncomePanel extends Component {
    addWorker(textual_source_name){
        this.props.model.updateUserIncomeSourceAllotment(textual_source_name, 1);
    }

    removeWorker(textual_source_name){
        this.props.model.updateUserIncomeSourceAllotment(textual_source_name, -1);
    }

    buildAddButton(textual_source_name, label, key_suffix) {
        let element_key = '';
        element_key += key_suffix + '_' + label;
        return (<button key={element_key} onClick={(e) => this.addWorker(textual_source_name)}>{label}</button>);
    }

    buildRemoveButton(textual_source_name, label, key_suffix) {
        let element_key = '';
        element_key += key_suffix + '_' + label;
        return (<button key={element_key} onClick={(e) => this.removeWorker(textual_source_name)}>{label}</button>);
    }

    buildLabel(text, key_suffix){
        let element_key = '';
        element_key += key_suffix + '_' + text;
        return(<label key={element_key}>{text}</label>);
    }

    buildBreak(key_suffix){
        return(<br key={key_suffix}></br>);
    }



    buildIncome() {
        let panelElements = [];
        if (this.props.model.income != null) {
            for (var key in this.props.model.income){
                let incomeString = '';
                var income_obj = this.props.model.income[key]
                var amount = income_obj['amount']
                var description = income_obj['description']
                incomeString += key + " (" + amount + ")"
                if (description != null) {
                    incomeString += " (" + description + ")";
                }
                panelElements.push(this.buildLabel('| ', key));
                panelElements.push(this.buildAddButton(key, '+', key));
                panelElements.push(this.buildLabel(incomeString, key));
                panelElements.push(this.buildRemoveButton(key, '-', key));
                panelElements.push(this.buildBreak(key));
            }
        }
        return panelElements;
    }

    render() {
        return (
            <div key="IncomePanel" className="IncomePanel">
                <div>+-- workers --------------</div>
                {this.buildIncome()}
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default IncomePanel;
