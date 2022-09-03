import React, { Component } from 'react';
import './StatusPanel.css';

class StatusPanel extends Component {

    buildStatusPanel() {
        let panelElements = [];

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderTopWithLabel('status', false, 15), 'div_event_StatusPanel_buildMenuBorderTop'));
        panelElements.push(this.props.menu.buildBreak('break_StatusPanel_buildMenuBorderTop'));


        if (this.props.model.active_feature_state_details == null) {
            panelElements.push(this.props.menu.buildMenuItem('Its dark.', 'div_event_StatusPanel_nothing_todo'));
            panelElements.push(this.props.menu.buildBreak('break_StatusPanel_nothing_todo'));
        }
        else {
            panelElements.push(this.props.menu.buildMenuItem(this.props.model.active_feature_state_details.name, 'div_event_StatusPanel_active_feature_state_details'));
            panelElements.push(this.props.menu.buildBreak('break_StatusPanel_active_feature_state_details'));
        }

        switch(this.props.model.active) {
            case false:
                panelElements.push(this.props.menu.buildMenuItem('You are NOT active.', 'div_event_StatusPanel_UserStatusGameState)'));
                panelElements.push(this.props.menu.buildBreak('break_' + this.props.model.UserStatusGameState));
                break;
            case true:
                panelElements.push(this.props.menu.buildMenuItem('You are active', 'div_event_StatusPanel_UserStatusGameState)'));
                panelElements.push(this.props.menu.buildBreak('break_' + this.props.model.UserStatusGameState));
                break;
            default:
                panelElements.push(this.props.menu.buildMenuItem('You are dreaming..', 'div_event_StatusPanel_UserStatusGameState)'));
                panelElements.push(this.props.menu.buildBreak('break_' + this.props.model.UserStatusGameState));
                break;
        }

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderBottom(10), 'div_event_StatusPanel_buildMenuBorderBottom'));
        panelElements.push(this.props.menu.buildBreak('break_StatusPanel_buildMenuBorderBottom'));

        return panelElements;
    }

    render() {
        return (
            <div className="StatusPanel" key="StatusPanel">
                {this.buildStatusPanel()}
            </div>
        );
    }
}

export default StatusPanel;
