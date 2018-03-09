import React, { Component } from 'react';
import './IncomePanel.css';

class IncomePanel extends Component {
    buildIncome() {
        let incomeString = '';
        if (this.props.model.income == null) {
            incomeString = '|\n';
        }
        else{
            for (var key in this.props.model.income){
                var income_obj = this.props.model.income[key]
                var amount = income_obj['amount']
                var description = income_obj['description']
                incomeString += "| " + key + " (" + amount + ")"
                if (description != null) {
                    incomeString += " (" + description + ")";
                }
                incomeString += "\n";
            }
        }
        return incomeString;
    }

    render() {
        return (
            <div className="IncomePanel">
                <div>+-- stores ----------------</div>
                <div>{this.buildIncome()}</div>
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default IncomePanel;
