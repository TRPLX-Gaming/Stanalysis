import {ButtonComponent} from './ButtonComponent.js';
import {addComponent} from './../ComponentModuleManager.js';

export class ClearButtonComponent extends ButtonComponent {
  constructor(text='clear btn',config={className:'clear-btn'}) {
    super(text)
    this.className = config.className
  }
  
  action(displayElement) {
    displayElement.clear()
  }
  
}

addComponent('clear-btn',ClearButtonComponent)