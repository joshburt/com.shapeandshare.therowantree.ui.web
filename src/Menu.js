import React, { Component } from 'react';
import Lunicode from './lunicode.js'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lunicode: new Lunicode()
        };
    }

    buildMenuBorderTop(max_row_length = 40) {
        let row = '┌';
        while (row.length < (max_row_length - 1)){
            //let new_char = this.state.lunicode.tools.creepify.encode("-");
            //row = row + new_char;
            row = row + '─';
        }
        row = row + '┐';
        return row;
    }

    buildMenuBorderTopWithLabel(title, glitchFlag=false, max_row_length = 40) {
        let row = '┌ ' + this.processText(title, glitchFlag) + ' ';
        while (row.length < (max_row_length - 1)){
            //let new_char = this.state.lunicode.tools.creepify.encode("-");
            //row = row + new_char;
            row = row + '─';
        }
        row = row + '┐';
        return row;
    }

    buildMenuBorderBottom(max_row_length = 40) {
        let row = '└';
        while (row.length < (max_row_length - 1)){
            //let new_char = this.state.lunicode.tools.creepify.encode("-");
            //row = row + new_char;
            row = row + '─';
        }
        row = row + '┘';
        return row;
    }

    buildMenuItem(entry, glitchFlag=false, max_row_length = 40){
        let row = '│ ' + this.processText(entry, glitchFlag);
        while (row.length < (max_row_length - 1)){
            //let new_char = this.state.lunicode.tools.creepify.encode("-");
            //row = row + new_char;
            row = row + ' ';
        }
        row = row + '│';
        return row;
    }

    buildLabel(text, key_suffix){
        let element_key = '';
        element_key += key_suffix + '_' + text;
        return(<label key={element_key}>{text}</label>);
    }

    buildBreak(key_suffix){
        return(<br key={key_suffix}></br>);
    }

    processText(message, glitch=false){
        let new_message = message;
        if (glitch == true){
            new_message = this.state.lunicode.tools.creepify.encode(message);
        }
        return new_message;
    }
}

export default Menu;
