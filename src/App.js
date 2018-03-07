import React, { Component } from 'react';
import './App.css';
import StatusPanel from './StatusPanel.js';
import Model from './Model.js';
import { createStore } from 'redux';

class App extends Component {
    constructor(props) {
        super(props);
        this.model = new Model();
    }

    render() {
        return (
            <StatusPanel userGUID={this.model.userGUID} playerActivityStatus={this.model.playerActivityStatus} />
        );
    }
}

export default App;
