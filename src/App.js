import React, { Component } from 'react';
import './App.css';
import Model from './Model.js';
import StatusPanel from './StatusPanel.js';
import StoresPanel from './StoresPanel.js';
import PopulationPanel from './PopulationPanel.js';
import TravelPanel from './TravelPanel.js';
import IncomePanel from './IncomePanel.js';
import MerchantsPanel from './MerchantsPanel.js';
import EventPanel from './EventPanel.js';
import Menu from './Menu.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            model: new Model(),
            menu: new Menu()
        };
    }

    tick() {
        let ephemeralModel = this.state.model;
        ephemeralModel.updateModel();
        this.setState(prevState => ({
            seconds: prevState.seconds + 1,
            model: ephemeralModel,
            menu: prevState.menu
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
            <table>
                <tbody>
                <tr>
                    <td colSpan="4">
                        <div>
                            [DEBUG] Seconds: {this.state.seconds} [/DEBUG]
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <StatusPanel model={this.state.model} menu={this.state.menu} />
                        <TravelPanel model={this.state.model} menu={this.state.menu} />
                    </td>
                    <td>
                        <PopulationPanel model={this.state.model} menu={this.state.menu} />
                        <IncomePanel model={this.state.model} menu={this.state.menu} />
                    </td>
                    <td>
                        <MerchantsPanel model={this.state.model} menu={this.state.menu} />
                    </td>
                    <td>
                        <StoresPanel model={this.state.model} menu={this.state.menu} />
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <EventPanel model={this.state.model} menu={this.state.menu} />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default App;
