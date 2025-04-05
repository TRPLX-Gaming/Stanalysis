import Component from './Component.js'
import {addComponent} from './../ComponentModuleManager.js';

export class HeaderComponent extends Component {
  constructor(text='Pick your mode for calculation',config={className:'home-header'}) {
    super(text)
    this.className = config.className
  }
  
  build() {
    let element = document.createElement('h1')
    element.setAttribute('class',this.className)
    element.textContent = this.text
    element.style.fontFamily = 'Georgia,serif'
    return element
  }
  
  action(){}
  
}

addComponent('header',HeaderComponent)