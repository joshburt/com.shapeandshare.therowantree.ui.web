import React, { Component } from 'react';
import './MerchantsPanel.css';

class MerchantsPanel extends Component {
    buildButton(transform_name, label) {
        return (<button key={label} onClick={(e) => this.props.model.peformMerchantTransform(transform_name)}>{label}</button>);
    }

    buildMerchantsPanel() {
        let panelElements = [];

        if (this.props.model.merchants == null) {
            return(<div>| You are lone figure at the trading grounds. The wind your only company.\n</div>);
        }
        else{
            for (var key in this.props.model.merchants){
                var merchant_name = this.props.model.merchants[key]
                panelElements.push(this.buildButton(merchant_name, merchant_name));
            }
        }
        return panelElements;
    }

    render() {
        return (
            <div className="MerchantsPanel">
                <div>+-- merchants ----------------</div>
                {this.buildMerchantsPanel()}
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default MerchantsPanel;
