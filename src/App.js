import React, { Component } from 'react';
import './App.css';
import StatusPanel from './StatusPanel.js';
import Model from './Model.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            model: new Model()
        };
    }

    tick() {
        this.state.model.updateModel();
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    render() {
        return (
            <div>
                [DEBUG] Seconds: {this.state.seconds} | playerActivityStatus: {this.state.model.playerActivityStatus} | guid: {this.state.model.userGUID} [/DEBUG]
                <StatusPanel playerActivityStatus={this.state.model.playerActivityStatus} />
            </div>
        );
    }
}

export default App;
