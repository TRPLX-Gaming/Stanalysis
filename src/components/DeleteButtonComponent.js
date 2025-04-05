import {ButtonComponent} from './ButtonComponent.js';
import {addComponent} from './../ComponentModuleManager.js';

export class DeleteButtonComponent extends ButtonComponent {
  constructor(text='backspace btn',config={className:'delete-btn'}) {
    super(text)
    this.className = config.className
  }
  
  action(displayElement) {
    displayElement.remove()
  }
  
}

addComponent('delete-btn',DeleteButtonComponent)