import {ButtonComponent} from './ButtonComponent.js';
import UngroupedArray from './../utils/UngroupedArray.js';
import {addComponent,updateLM} from './../ComponentModuleManager.js';

export class CalculateButtonComponent extends ButtonComponent {
  constructor(text='Calculate',config={className:'ungrouped-calc-btn'}) {
    super(text)
    this.className = config.className
  }
  
  static data = null
  static nums = null
  
  action(displayElement) {
    console.log(displayElement.textContent)
    let check = confirm('are you sure?')
    if (check) {
      let crossCheck = (/\d+(\.\d+)?(?:,\d+(\.\d+)?)*/g).test(displayElement.textContent)
      if (crossCheck) {
        CalculateButtonComponent.nums = displayElement.textContent.match(/\d+(\.\d+)?(?:,\d+(\.\d+)?)*/g)
        CalculateButtonComponent.nums = CalculateButtonComponent.nums[0].split(',').map(Number)
        CalculateButtonComponent.data = new UngroupedArray(CalculateButtonComponent.nums)
        updateLM('show-ungrouped-calc')
      } else {
        alert('Please input a value!') 
      }
    }
  }
  
}

addComponent('calc-btn',CalculateButtonComponent)

export function analyzedData() {
  return CalculateButtonComponent.data
}

export function inputtedData() {
  return CalculateButtonComponent.nums
}