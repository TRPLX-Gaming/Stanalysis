import {ButtonComponent} from './ButtonComponent.js';
import {addComponent} from './../ComponentModuleManager.js';

export class InputButtonComponent extends ButtonComponent {
  constructor(text='input btn',config={className:'input-btn'}) {
    super(text)
    this.className = config.className
  }
  
  action(inputElement,displayElement) {
    let value = parseInt(inputElement.value)
    let check = inputElement.value.match(/\d+(\.\d+)?(?:,\d+(\.\d+)?)*/g)
    if (isNaN(value) && !check) {
      inputElement.value = ''
    } else {
      displayElement.action(parseInt(check))
      inputElement.value = ''
    }
  }
  
}

addComponent('input-btn',InputButtonComponent)