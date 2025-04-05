import {ButtonComponent} from './ButtonComponent.js';
import {analyzedData} from './CalculateButtonComponent.js';
import GroupedArray from './../utils/GroupedArray.js';
import {addComponent,updateLM} from './../ComponentModuleManager.js';

export class ConvertButtonComponent extends ButtonComponent {
  constructor(text='Convert to grouped data',config={className:'convert-btn'}) {
    super(text)
    this.className = config.className
  }
  
  static grouped = null
  
  action() {
    let choice = confirm('Do you want to use Sturges rule?')
    if (choice) {
      ConvertButtonComponent.grouped = new GroupedArray(analyzedData().arr,analyzedData().sturgesRule)
      updateLM('convert-ungrouped')
    } else {
      let numIntervals = prompt('Input your desired class interval...')
      let num = parseInt(numIntervals)
      if (!isNaN(num)) {
        ConvertButtonComponent.grouped = new GroupedArray(analyzedData().arr,num)
        updateLM('convert-ungrouped')
      }
    }
  }
  
}

addComponent('convert-btn',ConvertButtonComponent)

export function groupedData() {
  return ConvertButtonComponent.grouped
}