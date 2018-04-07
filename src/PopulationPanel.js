import React, { Component } from 'react';
import './PopulationPanel.css';

class PopulationPanel extends Component {

    buildPanel(){
        let panelElements = [];

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderTopWithLabel('population', false, 15), 'div_event_PopulationPanel_buildMenuBorderTop'));
        panelElements.push(this.props.menu.buildBreak('break_PopulationPanel_buildMenuBorderTop'));

        let popString = ''
        if (this.props.model.population === undefined){
            popString = '0'
        }
        else {
            popString = this.props.model.population
        }
        panelElements.push(this.props.menu.buildMenuItem(popString, 'div_event_PopulationPanel_UserStatusGameState_population'));
        panelElements.push(this.props.menu.buildBreak('break_PopulationPanel_population'));

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderBottom(10), 'div_event_PopulationPanel_buildMenuBorderBottom'));
        panelElements.push(this.props.menu.buildBreak('break_StatusPanel_buildMenuBorderBottom'));

        return panelElements;
    }

    render() {
        return (
            <div className="PopulationPanel">
                {this.buildPanel()}
            </div>
        );
    }
}

export default PopulationPanel;
