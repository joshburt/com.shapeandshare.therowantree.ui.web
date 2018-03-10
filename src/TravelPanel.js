import React, { Component } from 'react';
import './TravelPanel.css';

class TravelPanel extends Component {

    sendTraveler(location){
        this.props.model.transportUser(location);
    }
    buildButton(location, label) {
        return (<button key={label} onClick={(e) => this.sendTraveler(location)}>{label}</button>);
    }
    buildTravel() {
        let buttons = [];
        if (this.props.model.features == null) {
            return ('<div>| You are nowhere..\n</div>');
        }
        else{
            for (var key in this.props.model.features){
                var feature_name = this.props.model.features[key]
                let travelString = '';
                travelString += key + " (" + feature_name + ")"

                if (this.props.model.activeFeature === feature_name) {
                    travelString += '(*)'
                }
                buttons.push(this.buildButton(feature_name, travelString));
            }
        }
        return buttons;
    }

    render() {
        return (
            <div className="TravelPanel">
                <div>+-- travel ----------------</div>
{this.buildTravel()}
                <div>+--------------------------</div>
            </div>
        );
    }
}

export default TravelPanel;
