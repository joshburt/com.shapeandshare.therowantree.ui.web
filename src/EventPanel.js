import React, { Component } from 'react';
import './EventPanel.css';

class EventPanel extends Component {
    buildEventPanel() {
        let eventString = '';
        switch(this.props.model.UserStatusGameState) {
            case 0:
                eventString += 'You are NOT active.';
                break;
            case 1:
                eventString += 'You are active.';
                break;
            default:
                eventString += 'You are dreaming..';
                break;
        }
        return eventString;
    }

    render() {
        return (
            <div className="EventPanel">
                <div>+-- events --------------------------------------------------------------------</div>
                <div>| {this.buildEventPanel()}</div>
                <div>+------------------------------------------------------------------------------</div>
            </div>
        );
    }
}

export default EventPanel;
