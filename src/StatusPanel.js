import React, { Component } from 'react';
import './StatusPanel.css';
import Secrets from './Secrets.js';

class StatusPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerActivityStatus: -1
        };
    }


    componentDidMount() {
        fetch(Secrets.SERVER_BASE + '/api/user/active/state', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'API-ACCESS-KEY': Secrets.API_ACCESS_KEY,
                'API-VERSION': Secrets.API_VERSION
            },
            body: JSON.stringify({
                guid: this.props.userGUID
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                playerActivityStatus: responseJson.active
            }, function(){
            });
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    buildStatus() {
        var statusString = '';
        switch(this.state.playerActivityStatus) {
            case 0:
                statusString += '| You are NOT active.';
                break;
            case 1:
                statusString += '| You are active.';
                break;
            default:
                statusString += '| You are dreaming..';
                break;
        }
        return statusString;
    }

    render() {
        return (
            <div>
                <div>+-- status ----------------</div>
                <div>{this.buildStatus()}</div>
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default StatusPanel;
