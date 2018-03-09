import React, { Component } from 'react';
import './MerchantsPanel.css';

class MerchantsPanel extends Component {
    buildMerchantsPanel() {
        let merchantsString = '';
        if (this.props.model.merchants == null) {
            merchantsString = '| You are lone figure at the trading grounds. The wind your only company.\n';
        }
        else{
            for (var key in this.props.model.merchants){
                var merchant_name = this.props.model.merchants[key]
                merchantsString += "| " + key + " (" + merchant_name + ")\n"
            }
        }
        return merchantsString;
    }

    render() {
        return (
            <div className="MerchantsPanel">
                <div>+-- merchants ----------------</div>
                <div>{this.buildMerchantsPanel()}</div>
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default MerchantsPanel;
