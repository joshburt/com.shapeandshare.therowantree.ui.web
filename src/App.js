import React, { Component } from 'react';
import './App.css';
import StatusPanel from './StatusPanel.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userGUID: '870a7d28-1cef-11e8-b445-60f29d3d5700'
        };
    }

    render() {
        return (
            <StatusPanel userGUID={this.state.userGUID} />
        );
    }
}

export default App;
