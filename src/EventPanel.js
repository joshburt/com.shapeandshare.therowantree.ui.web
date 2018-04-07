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

    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    buildEventPanel() {
        let panelElements = [];

        for (var index in this.props.model.notifications){
            let event_collection = this.props.model.notifications[index];
            if ('undefined' !== typeof event_collection) {
                for (var event_obj in event_collection) {
                    let note_item_id = this.uuidv4();
                    // panelElements.push(this.buildLabel('| DEBUG:' + note_obj[note_item][2], 'div_' + note_item_id));
                    // panelElements.push(this.buildBreak('break_' + note_item_id));

                    let my_event = JSON.parse(event_collection[event_obj][2]);
                    let event_title = my_event['title'];
                    let event_text = my_event['text'];
                    let event_reward = my_event['reward'];
                    let event_boon = my_event['boon'];

                    // build the event title
                    if (event_title !== undefined) {
                        panelElements.push(this.buildLabel('| ' + event_title, 'div_event_title_' + note_item_id));
                        panelElements.push(this.buildBreak('break_' + note_item_id));
                    }
                    if (event_text !== undefined) {
                        for (var line_index in event_text) {
                            panelElements.push(this.buildLabel('| ' + event_text[line_index], 'div_event_text_' + note_item_id + '_' + line_index.toString()));
                            panelElements.push(this.buildBreak('break_event_text_' + note_item_id + '_' + line_index.toString()));
                        }
                    }
                    if (event_reward !== undefined){
                        panelElements.push(this.buildLabel('| ' + JSON.stringify(event_reward), 'div_event_reward_' + note_item_id));
                        panelElements.push(this.buildBreak('break_event_reward_' + note_item_id))
                    }
                    if (event_boon !== undefined) {
                        panelElements.push(this.buildLabel('| ' + JSON.stringify(event_boon), 'div_event_boon_' + note_item_id));
                        panelElements.push(this.buildBreak('break_event_boon_' + note_item_id))
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
