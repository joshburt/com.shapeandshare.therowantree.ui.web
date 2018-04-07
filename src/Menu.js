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
            row = row + '─';
        }
        row = row + '┐';
        return row;
    }

    buildMenuBorderTopWithLabel(title, glitchFlag=false, max_row_length = 40) {
        let row = '┌ ' + this.processText(title, glitchFlag) + ' ';
        while (row.length < (max_row_length - 1)){
            row = row + '─';
        }
        row = row + '┐';
        return row;
    }

    buildMenuBorderBottom(max_row_length = 40) {
        let row = '└';
        while (row.length < (max_row_length - 1)){
            row = row + '─';
        }
        row = row + '┘';
        return row;
    }

    buildMenuItem(entry, glitchFlag=false, max_row_length = 40){
        let row = '│ ' + this.processText(entry, glitchFlag);
        while (row.length < (max_row_length - 1)){
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
        if (glitch === true){

            let ephemeralLunicode = this.state.lunicode;

            // Creepify has a few options. Set them before encoding:
            ephemeralLunicode.tools.creepify.options.top = false; 	// add diacritics on top. Default: true
            ephemeralLunicode.tools.creepify.options.middle = false;	// add diacritics in the middle. Default: true
            ephemeralLunicode.tools.creepify.options.bottom = true;	// add diacritics on the bottom. Default: true
            ephemeralLunicode.tools.creepify.options.maxHeight = 5; // How many diacritic marks shall we put on top/bottom? Default: 15
            ephemeralLunicode.tools.creepify.options.randomization = 50; // 0-100%. maxHeight 100 and randomization 20%: the height goes from 80 to 100. randomization 70%: height goes from 30 to 100. Default: 100

            this.setState(prevState => ({
                lunicode: ephemeralLunicode
            }));

            return this.state.lunicode.tools.creepify.encode(message);
        }
        return message;
    }
}

export default Menu;
