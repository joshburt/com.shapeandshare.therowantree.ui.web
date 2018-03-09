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
        let ephemeralModel = this.state.model;
        ephemeralModel.updateModel();
        this.setState(prevState => ({
            seconds: prevState.seconds + 1,
            model: ephemeralModel
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
                [DEBUG] Seconds: {this.state.seconds} |
                playerActivityStatus: {this.state.model.UserStatusGameState} |
                guid: {this.state.model.guid} |
                birthday: {this.state.model.birthday} [/DEBUG]
                <StatusPanel model={this.state.model} />
            </div>
        );
    }
}

export default App;
