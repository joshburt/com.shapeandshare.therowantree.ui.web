import React, { Component } from 'react';
import './StatusPanel.css';

class StatusPanel extends Component {
    buildStatus() {
        let statusString = '';
        switch(this.props.model.UserStatusGameState) {
            case 0:
                statusString += 'You are NOT active.';
                break;
            case 1:
                statusString += 'You are active.';
                break;
            default:
                statusString += 'You are dreaming..';
                break;
        }
        return statusString;
    }

    render() {
        return (
            <div className="StatusPanel">
                <div>+-- status ----------------</div>
                <div>| {this.buildStatus()}</div>
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default StatusPanel;
