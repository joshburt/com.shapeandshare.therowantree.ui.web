import React, { Component } from 'react';
import './PopulationPanel.css';

class PopulationPanel extends Component {
    render() {
        return (
            <div className="PopulationPanel">
                <div>+-- population -----------</div>
                <div>| {this.props.model.population}</div>
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default PopulationPanel;
