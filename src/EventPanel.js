import React, { Component } from 'react';
import './EventPanel.css';

class EventPanel extends Component {

    buildLabel(text, key_suffix){
        let element_key = '';
        element_key += key_suffix + '_' + text;
        return(<label key={element_key}>{text}</label>);
    }

    buildBreak(key_suffix){
        return(<br key={key_suffix}></br>);
    }

    buildEventPanel() {
        let panelElements = [];

        switch(this.props.model.UserStatusGameState) {
            case 0:
                panelElements.push(this.buildLabel('| You are NOT active.', 0));
                break;
            case 1:
                panelElements.push(this.buildLabel('| You are active.', 1));
                break;
            default:
                panelElements.push(this.buildLabel('| You are dreaming..', 2));
                break;
        }

        panelElements.push(this.buildBreak(1));

        for (var index in this.props.model.notifications){
            let note_obj = this.props.model.notifications[index];
            if ('undefined' !== typeof note_obj) {
                for (var note_item in note_obj) {
                    let note_item_id = note_obj[note_item][0] + '_' + note_obj[note_item][1] + '_' + note_obj[note_item][2];
                    // panelElements.push(this.buildLabel('| DEBUG:' + note_obj[note_item][2], 'div_' + note_item_id));
                    // panelElements.push(this.buildBreak('break_' + note_item_id));

                    let my_event = JSON.parse(note_obj[note_item][2]);
                    let event_title = my_event['title'];
                    let event_text = my_event['text'];
                    let event_reward = my_event['reward'];
                    let event_boon = my_event['boon'];

                    // build the event title
                    if (event_title !== undefined) {
                        panelElements.push(this.buildLabel('| ' + event_title, 'div_' + note_item_id + event_title));
                        panelElements.push(this.buildBreak('break_' + note_item_id + event_title));
                    }
                    if (event_text !== undefined) {
                        for (var line_index in event_text) {
                            panelElements.push(this.buildLabel('| ' + event_text[line_index], 'div_event_text_' + line_index.toString()));
                            panelElements.push(this.buildBreak('break_event_text' + line_index.toString()));
                        }
                    }
                    if (event_reward !== undefined){
                        panelElements.push(this.buildLabel('| ' + JSON.stringify(event_reward), 'div_event_reward_' + JSON.stringify(event_reward) + '_' + note_item_id.toString()));
                        panelElements.push(this.buildBreak('break_event_reward_' + JSON.stringify(event_reward)))
                    }
                    if (event_boon !== undefined) {
                        panelElements.push(this.buildLabel('| ' + JSON.stringify(event_boon), 'div_event_boon_' + JSON.stringify(event_boon) + '_' + note_item_id.toString()));
                        panelElements.push(this.buildBreak('break_event_boon_' + JSON.stringify(event_boon)))
                    }

                }
            }

        }


        return panelElements;
    }

    render() {
        return (
            <div className="EventPanel" key="EventPanel">
                <div>+-- events --------------------------------------------------------------------</div>
                {this.buildEventPanel()}
                <div>+------------------------------------------------------------------------------</div>
            </div>
        );
    }
}

export default EventPanel;
