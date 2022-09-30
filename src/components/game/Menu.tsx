import Lunicode from './lunicode.js'

class Menu {
  readonly #lunicode: Lunicode

  constructor () {
    this.#lunicode = new Lunicode()
  }

  public buildMenuBorderTop (rowLengthMaximum: number = 40): string {
    let row: string = '┌'
    while (row.length < (rowLengthMaximum - 1)) {
      row = row + '─'
    }
    row = row + '┐'
    return row
  }

  public buildMenuBorderTopWithLabel (title: string, glitchFlag: boolean = false, rowLengthMaximum: number = 40): string {
    let row: string = '┌ ' + this.processText(title, glitchFlag) + ' '
    while (row.length < (rowLengthMaximum - 1)) {
      row = row + '─'
    }
    row = row + '┐'
    return row
  }

  public buildMenuBorderBottom (rowLengthMaximum: number = 40): string {
    let row: string = '└'
    while (row.length < (rowLengthMaximum - 1)) {
      row = row + '─'
    }
    row = row + '┘'
    return row
  }

  public buildMenuItem (entry: string, glitchFlag: boolean = false, rowLengthMaximum: number = 40): string {
    const row: string = '│ ' + this.processText(entry, glitchFlag)
    // while (row.length < (rowLengthMaximum - 1)){
    //    row = row + ' ';
    // }
    // row = row + '│';
    return row
  }

  public buildLabel (text: string, keySuffix: string): any {
    let elementKey = ''
    elementKey += keySuffix + '_' + text
    return (<label key={elementKey}>{text}</label>)
  }

  public buildLabelWithTitle (text: string, titleText: string, keySuffix: string): any {
    let elementKey: string = ''
    elementKey += keySuffix + '_' + text
    return (<label key={elementKey} title={titleText}>{text}</label>)
  }

  public buildBreak (keySuffix: string): any {
    return (<br key={keySuffix}></br>)
  }

  public processText (message: string, glitch: boolean = false): string {
    if (glitch) {
      const ephemeralLunicode = this.#lunicode

      // Creepify has a few options. Set them before encoding:
      ephemeralLunicode.tools.creepify.options.top = true // add diacritics on top. Default: true
      ephemeralLunicode.tools.creepify.options.middle = false // add diacritics in the middle. Default: true
      ephemeralLunicode.tools.creepify.options.bottom = true // add diacritics on the bottom. Default: true
      ephemeralLunicode.tools.creepify.options.maxHeight = 1 // How many diacritic marks shall we put on top/bottom? Default: 15
      ephemeralLunicode.tools.creepify.options.randomization = 0 // 0-100%. maxHeight 100 and randomization 20%: the height goes from 80 to 100. randomization 70%: height goes from 30 to 100. Default: 100

      // tokenize the message on white space, otherwise it gets treated too.
      return this.#lunicode.tools.creepify.encode(message)
    }
    return message
  }
}

export default Menu
