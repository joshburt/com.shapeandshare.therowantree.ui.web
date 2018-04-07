import React, { Component } from 'react';
import './TravelPanel.css';

class TravelPanel extends Component {

    buildButton(location, label, key_suffix) {
        let element_key = '';
        element_key += key_suffix + '_' + label;
        return (<button key={element_key} onClick={(e) => this.props.model.transportUser(location)}>{label}</button>);
    }

    buildTravel() {
        let panelElements = [];

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderTopWithLabel('travel', false, 15), 'div_event_TravelPanel_buildMenuBorderTop'));
        panelElements.push(this.props.menu.buildBreak('break_TravelPanel_buildMenuBorderTop'));

        if (this.props.model.features == null) {
            panelElements.push(this.props.menu.buildMenuItem('You are nowhere..', 'div_event_TravelPanel_active_feature'));
            panelElements.push(this.props.menu.buildBreak('break_event_TravelPanel_active_feature'));
        }
        else{
            for (var key in this.props.model.features){
                var feature_name = this.props.model.features[key]

                // panelElements.push(this.props.menu.buildLabel('| ', feature_name));
                if (this.props.model.activeFeature === feature_name) {
                    panelElements.push(this.props.menu.buildMenuItem(feature_name, 'div_event_TravelPanel_feature_' + feature_name));
                }
                else {
                    panelElements.push(this.buildButton(feature_name, feature_name, feature_name));
                }
                panelElements.push(this.props.menu.buildBreak('break_event_TravelPanel_feature' + feature_name));
            }
        }

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderBottom(10), 'div_event_TravelPanel_buildMenuBorderBottom'));
        panelElements.push(this.props.menu.buildBreak('break_TravelPanel_buildMenuBorderTop'));

        return panelElements;
    }

    render() {
        return (
            <div className="TravelPanel">
                {this.buildTravel()}
            </div>
        );
    }
}

export default TravelPanel;
