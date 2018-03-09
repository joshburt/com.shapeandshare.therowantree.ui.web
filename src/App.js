import React, { Component } from 'react';
import './App.css';
import Model from './Model.js';
import StatusPanel from './StatusPanel.js';
import StoresPanel from './StoresPanel.js';
import PopulationPanel from './PopulationPanel.js';
import TravelPanel from './TravelPanel.js';
import IncomePanel from './IncomePanel.js';
import MerchantsPanel from './MerchantsPanel.js';

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
                <div className="App">
                    [DEBUG] Seconds: {this.state.seconds} |
                    playerActivityStatus: {this.state.model.UserStatusGameState} |
                    guid: {this.state.model.guid} |
                    birthday: {this.state.model.birthday} [/DEBUG]
                </div>
                <StatusPanel model={this.state.model} />
                <StoresPanel model={this.state.model} />
                <PopulationPanel model={this.state.model} />
                <TravelPanel model={this.state.model}/>
                <IncomePanel model={this.state.model} />
                <MerchantsPanel model={this.state.model} />
            </div>
        );
    }
}

export default App;
