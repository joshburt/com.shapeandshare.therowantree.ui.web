import React, { Component } from 'react';
import './StoresPanel.css';

class StoresPanel extends Component {
    buildStores() {
        let storesString = '';
        if (this.props.model.stores == null) {
            storesString = '| Your pockets are empty..';
        }
        else{
            for (var key in this.props.model.stores){
                var store_obj = this.props.model.stores[key]
                var amount = store_obj['amount']
                var description = store_obj['description']
                storesString += "| " + key + " (" + amount + ")"
                if (description != null) {
                    storesString += " (" + description + ")";
                }
                storesString += "\n";
            }
        }
        return storesString;
    }

    render() {
        return (
            <div className="StoresPanel">
                <div>+-- stores ----------------</div>
                <div>{this.buildStores()}</div>
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default StoresPanel;
