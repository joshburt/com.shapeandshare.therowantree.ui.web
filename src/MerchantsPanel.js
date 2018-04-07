import React, { Component } from 'react';
import './MerchantsPanel.css';

class MerchantsPanel extends Component {
    buildButton(transform_name, label, key_suffix) {
        let element_key = '';
        element_key += key_suffix + '_' + label;
        return (<button key={element_key} onClick={(e) => this.props.model.performMerchantTransform(transform_name)}>{label}</button>);
    }

    buildLabel(text, key_suffix){
        let element_key = '';
        element_key += key_suffix + '_' + text;
        return(<label key={element_key}>{text}</label>);
    }

    buildBreak(key_suffix){
        return(<br key={key_suffix}></br>);
    }

    buildMerchantsPanel() {
        let panelElements = [];

        if (this.props.model.merchants == null) {
            return(<div>| You are a lone figure at the trading grounds.<div></div>| The wind your only company.</div>);
        }
        else{
            for (var key in this.props.model.merchants){
                var merchant_name = this.props.model.merchants[key]
                panelElements.push(this.buildLabel('| ', merchant_name));
                panelElements.push(this.buildButton(merchant_name, merchant_name, merchant_name));
                panelElements.push(this.buildBreak(merchant_name));
            }
        }
        return panelElements;
    }

    render() {
        return (
            <div key="MerchantsPanel" className="MerchantsPanel">
                <div>+-- merchants ----------------</div>
                {this.buildMerchantsPanel()}
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default MerchantsPanel;
