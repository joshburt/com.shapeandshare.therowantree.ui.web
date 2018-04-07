import React, { Component } from 'react';
import './StoresPanel.css';

class StoresPanel extends Component {
    buildStoresPanel() {
        let panelElements = [];

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderTopWithLabel('Inventory', false, 15), 'div_event_StoresPanel_buildMenuBorderTop'));
        panelElements.push(this.props.menu.buildBreak('break_StoresPanel_buildMenuBorderTop'));

        if (this.props.model.stores == null) {
            panelElements.push(this.props.menu.buildMenuItem('Your pockets are empty..', 'div_StoresPanel_nothing_todo'));
            panelElements.push(this.props.menu.buildBreak('break_StoresPanel_nothing_todo'));
        }
        else{
            for (let key in this.props.model.stores){
                let storesString = '';
                let store_obj = this.props.model.stores[key];
                let amount = store_obj['amount'];
                let description = store_obj['description'];
                storesString = key + " (" + amount + ")";
                if (description != null) {
                    storesString += " (" + description + ")";
                }
                panelElements.push(this.props.menu.buildMenuItem(storesString, 'div_StoresPanel_' + key));
                panelElements.push(this.props.menu.buildBreak('break_StoresPanel_' + key));
            }
        }
        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderBottom(10), 'div_event_StoresPanel_buildMenuBorderBottom'));
        panelElements.push(this.props.menu.buildBreak('break_StoresPanel_buildMenuBorderBottom'));

        return panelElements;
    }

    render() {
        return (
            <div className="StoresPanel">
                {this.buildStoresPanel()}
            </div>
        );
    }
}

export default StoresPanel;
