import {ButtonComponent} from './ButtonComponent.js';
import {addComponent,updateLM} from './../ComponentModuleManager.js';

export class GenerateButtonComponent extends ButtonComponent {
  constructor(text='Generate table',config={className:'generate-btn'}) {
    super(text)
    this.className = config.className
  }
  
  static input = null
  
  action(inputElem) {
    let check = confirm('are you sure?')
    if (check) {
      let crossCheck = (/\d+(\.\d+)?(?:,\d+(\.\d+)?)*/g).test(inputElem.value)
      if (crossCheck) {
        let num = Math.ceil(parseFloat(inputElem.value))
        console.log(inputElem.value)
        if (num < 2) {
          alert('Please input a value greater than 1!')
          return
        } else {
          GenerateButtonComponent.input = num
          updateLM('generate-grouped-table')
        }
      } else {
        alert('Please input a valid value')
      }
    }
  }
  
}

addComponent('generate-btn',GenerateButtonComponent)

export const numRows = () => GenerateButtonComponent.input