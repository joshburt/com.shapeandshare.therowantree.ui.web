import React, { Component } from 'react';
import './EventPanel.css';

class EventPanel extends Component {

    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    buildEventPanel() {
        let panelElements = [];

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderTopWithLabel('events', false, 45), 'div_event_EventPanel_buildMenuBorderTop'));
        panelElements.push(this.props.menu.buildBreak('break_EventPanel_buildMenuBorderTop'));

        for (var index in this.props.model.notifications){
            let event_collection = this.props.model.notifications[index];
            if ('undefined' !== typeof event_collection) {
                for (var event_obj in event_collection) {
                    let note_item_id = this.uuidv4();

                    let my_event = event_collection[event_obj]["event"];
                    let event_title = my_event['title'];
                    let event_text = my_event['text'];
                    let event_reward = my_event['reward'];
                    let event_curse = my_event['curse'];


                    if (event_text !== undefined) {
                        let story = '';
                        for (var line_index in event_text) {
                            story = story + event_text[line_index];
                            if (line_index < event_text.length - 1){
                                story = story  + '\n';
                            }
                        }
                        if (line_index === undefined) {
                            line_index = 0;
                        }

                        panelElements.push(this.props.menu.buildLabelWithTitle(this.props.menu.buildMenuItem(event_title, true, 40), story, 'div_event_title_' + note_item_id));
                        panelElements.push(this.props.menu.buildBreak('break_event_text_story' + note_item_id + '_' + line_index.toString()));
                    }
                    else {
                        // build the event title
                        if (event_title !== undefined) {
                            panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuItem(event_title, false, 40), 'div_event_title_' + note_item_id));
                            panelElements.push(this.props.menu.buildBreak('break_' + note_item_id));
                        }
                    }

                    // TODO: add more reward/boon info to the hover text
//                    if (event_reward !== undefined){
//                        panelElements.push(this.buildLabel('| ' + JSON.stringify(event_reward), 'div_event_reward_' + note_item_id));
//                        panelElements.push(this.buildBreak('break_event_reward_' + note_item_id))
//                    }
//                    if (event_curse !== undefined) {
//                        panelElements.push(this.buildLabel('| ' + JSON.stringify(event_curse), 'div_event_curse_' + note_item_id));
//                        panelElements.push(this.buildBreak('break_event_curse_' + note_item_id))
//                    }

                }
            }

        }

        panelElements.push(this.props.menu.buildLabel(this.props.menu.buildMenuBorderBottom(), 'div_event_EventPanel_buildMenuBorderBottom'));
        panelElements.push(this.props.menu.buildBreak('break_EventPanel_buildMenuBorderBottom'));

        return panelElements;
    }

    render() {
        return (
            <div className="EventPanel" key="EventPanel">
                {this.buildEventPanel()}
            </div>
        );
    }
}

export default EventPanel;
