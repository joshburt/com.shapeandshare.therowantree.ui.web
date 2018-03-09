import React, { Component } from 'react';
import './TravelPanel.css';

class TravelPanel extends Component {
    buildTravel() {
        let travelString = '';
        if (this.props.model.features == null) {
            travelString = '| You are nowhere..';
        }
        else{
            for (var key in this.props.model.features){
                var feature_name = this.props.model.features[key]
                travelString += "| " + key + " (" + feature_name + ")\n"
            }
        }
        return travelString;
    }

    render() {
        return (
            <div className="TravelPanel">
                <div>+-- travel ----------------</div>
                <div>{this.buildTravel()}</div>
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default TravelPanel;
