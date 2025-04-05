import Component from './Component.js';
import {addComponent} from './../ComponentModuleManager.js';

export class InputComponent extends Component {
  constructor(text,config={className:'ungrouped-input',placeholder:'input your data'}) {
    super(text) 
    this.className = config.className
    this.placeholder = config.placeholder
  }
  
  build() {
    let element = document.createElement('input')
    element.setAttribute('class',this.className)
    element.placeholder = this.placeholder
    element.type = 'number'
    return element
  }
  
  action() {
    console.log(this.build().value)
  }
  
}

addComponent('input-elem',InputComponent)