import React, { Component } from 'react';
import './MerchantsPanel.css';

class MerchantsPanel extends Component {
    buildButton(transform_name, label, key_suffix) {
        let element_key = '';
        element_key += key_suffix + '_' + label;
        return (<button key={element_key} onClick={(e) => this.props.model.performMerchantTransform(transform_name)}>{label}</button>);
    }

    buildMerchantsPanel() {
        let panelElements = [];

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderTopWithLabel('Merchants', false, 15), 'div_event_MerchantsPanel_buildMenuBorderTop'));
        panelElements.push(this.props.menu.buildBreak('break_MerchantsPanel_buildMenuBorderTop'));

        if (this.props.model.merchants == null) {
            panelElements.push(this.props.menu.buildMenuItem('You are a lone figure at the trading grounds.', 'div_MerchantsPanel_nothing_todo_1'));
            panelElements.push(this.props.menu.buildMenuItem('The wind your only company.', 'div_MerchantsPanel_nothing_todo_2'));
            panelElements.push(this.props.menu.buildBreak('break_MerchantsPanel_nothing_todo'));
        }
        else{
            for (var key in this.props.model.merchants){
                var merchant_name = this.props.model.merchants[key]
                panelElements.push(this.props.menu.buildMenuItem('', 'div_MerchantsPanel_merchant_name_' + merchant_name));
                panelElements.push(this.buildButton(merchant_name, merchant_name, merchant_name));
                panelElements.push(this.props.menu.buildBreak('break_MerchantsPanel_' + merchant_name));
            }
        }

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderBottom(10), 'div_event_MerchantsPanel_buildMenuBorderBottom'));
        panelElements.push(this.props.menu.buildBreak('break_MerchantsPanel_buildMenuBorderBottom'));

        return panelElements;
    }

    render() {
        return (
            <div key="MerchantsPanel" className="MerchantsPanel">
                {this.buildMerchantsPanel()}
            </div>
        );
    }
}

export default MerchantsPanel;
