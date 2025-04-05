import Component from './Component.js'
import {addComponent} from './../ComponentModuleManager.js';

export class DivWrapperComponent extends Component {
  constructor(text='',config={className:'div-wrap'}) {
    super(text)
    this.className = config.className
  }  
  
  build(children) {
    let element = document.createElement('div')
    element.setAttribute('class',this.className)
    children.forEach(child => {
      element.appendChild(child)
    })
    return element
  }
  
  action() {}
}

addComponent('div-wrap',DivWrapperComponent)