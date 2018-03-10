import React, { Component } from 'react';
import './TravelPanel.css';

class TravelPanel extends Component {

    buildButton(location, label, key_suffix) {
        let element_key = '';
        element_key += key_suffix + '_' + label;
        return (<button key={element_key} onClick={(e) => this.props.model.transportUser(location)}>{label}</button>);
    }

    buildLabel(text, key_suffix){
        let element_key = '';
        element_key += key_suffix + '_' + text;
        return(<label key={element_key}>{text}</label>);
    }

    buildBreak(key_suffix){
        return(<br key={key_suffix}></br>);
    }

    buildTravel() {
        let panelElements = [];
        if (this.props.model.features == null) {
            return (<div>| You are nowhere..\n</div>);
        }
        else{
            for (var key in this.props.model.features){
                var feature_name = this.props.model.features[key]

                panelElements.push(this.buildLabel('| ', feature_name));
                if (this.props.model.activeFeature === feature_name) {
                    panelElements.push(this.buildLabel(feature_name, feature_name));
                }
                else {
                    panelElements.push(this.buildButton(feature_name, feature_name, feature_name));
                }
                panelElements.push(this.buildBreak(feature_name));
            }
        }
        return panelElements;
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
