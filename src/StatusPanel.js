import React, { Component } from 'react';
import './StatusPanel.css';

class StatusPanel extends Component {

    buildLabel(text, key_suffix){
        let element_key = '';
        element_key += key_suffix + '_' + text;
        return(<label key={element_key}>{text}</label>);
    }

    buildBreak(key_suffix){
        return(<br key={key_suffix}></br>);
    }

    buildStatusPanel() {
        let panelElements = [];

        if (this.props.model.active_feature_state_details == null) {
            return(<div>| Its dark.</div>);
        }
        else {
            panelElements.push(this.buildLabel('| ' + this.props.model.active_feature_state_details.name, this.props.model.active_feature_state_details.name));
        }

        switch(this.props.model.UserStatusGameState) {
            case 0:
                panelElements.push(<div>| You are NOT active.</div>);
                break;
            case 1:
                panelElements.push(<div>| You are active.</div>);
                break;
            default:
                panelElements.push(<div>| You are dreaming..</div>);
                break;
        }
        return panelElements;
    }

    render() {
        return (
            <div className="StatusPanel">
                <div>+-- status ----------------</div>
                {this.buildStatusPanel()}
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default StatusPanel;
