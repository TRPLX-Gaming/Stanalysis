import {ButtonComponent} from './ButtonComponent.js';
import {addComponent,updateLM} from './../ComponentModuleManager.js';
import GroupedTableArray from './../utils/GroupedTableArray.js';

export class GroupedAnalysisComponent extends ButtonComponent {
  constructor(text='Analyse Data',config={className:'grouped-calc-btn'}) {
    super(text)
    this.className = config.className
  }
  
  static data = null
  
  action(inputTable) {
    GroupedAnalysisComponent.data = inputTable.action()
    let data = GroupedAnalysisComponent.data
    let classIntervals = data.cIntevs
    let frequencies = data.frequencies
    GroupedAnalysisComponent.data = new GroupedTableArray(classIntervals,frequencies)
    updateLM('analyze-grouped-data')
  }  
  
}

addComponent('group-calc',GroupedAnalysisComponent)

export const groupedData = () => GroupedAnalysisComponent.data