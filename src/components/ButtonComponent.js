import Component from './Component.js';
import {addComponent} from './../ComponentModuleManager.js';

export class ButtonComponent extends Component {
  constructor(text='print data',config={color:'navy',className:'btn'}) {
    super(text)
    this.color = config.color
    this.className = config.className
  }
  
  build() {
    let element = document.createElement('button')
    element.setAttribute('class',this.className)
    // element.style.backgroundColor = this.color
    element.textContent = this.text
    return element
  }
  
  action() {
    //some random side effect
  }
  
}

addComponent('btn',ButtonComponent)
