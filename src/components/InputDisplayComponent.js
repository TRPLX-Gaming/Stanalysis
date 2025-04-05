import Component from './Component.js';
import {addComponent} from './../ComponentModuleManager.js';

export class InputDisplayComponent extends Component {
  constructor(text='Data:',config={className:'input-display'}) {
    super(text)
    this.className = config.className
    this.element = this.build()
    this.inputData = []
  }
  
  build() {
    let element = document.createElement('div')
    element.setAttribute('class',this.className)
    element.textContent = this.text
    return element  
  }
  
  action(val) {
    if (val) {
      this.inputData.push(val)
    }
    if (this.inputData.length >= 0) {
      this.element.textContent = `Data: ${this.inputData.join(',')}`
    }
  }
  
  remove() {
    this.inputData.pop()
    this.action()
  }
  
  clear() {
    let check = confirm('You sure you want to clear your inputs?')
    if (check) {
      this.inputData.length = 0
      this.action()
    } 
  }
  
}

addComponent('input-display',InputDisplayComponent)