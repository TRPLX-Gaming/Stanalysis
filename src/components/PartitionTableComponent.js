import Component from './Component.js';
import {addComponent} from './../ComponentModuleManager.js';

export class PartitionTableComponent extends Component {
  constructor(text='',config={className:'part-table'}) {
    super(text)
    this.className = config.className
  }
  
  build(partObj) {
    let table = document.createElement('table')
    table.setAttribute('class',this.className)
    let tHead = document.createElement('thead')
    //title header shi
    let th = document.createElement('th')
    th.textContent = partObj.title
    tHead.appendChild(th)
    table.appendChild(tHead)
    
    //table body
    let tBody = document.createElement('tbody')
    for(let p in partObj.data) {
      let tr = document.createElement('tr')
      
      let id = document.createElement('td')
      id.textContent = p
      tr.appendChild(id)
      
      let val = document.createElement('td')
      val.textContent = `${partObj.data[p]}`
      tr.appendChild(val)
      
      tBody.appendChild(tr)
    }
    table.appendChild(tBody)
    return table
  }
  
}

addComponent('parts-table',PartitionTableComponent)