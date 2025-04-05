import Component from './Component.js';
import {addComponent} from './../ComponentModuleManager.js';

export class DataTableComponent extends Component {
  constructor(text='',config={className:'data-table'}) {
    super(text)
    this.className = config.className
  }
  
  build(groupedObj) {
    let table = document.createElement('table')
    table.setAttribute('class',this.className)
    let tHead = document.createElement('thead')
    //title scope text
    for(let column of groupedObj) {
      let h = document.createElement('th')
      h.textContent = column.title
      tHead.appendChild(h)
    }
    table.appendChild(tHead)
    //body shi
    let tBody = document.createElement('tbody')
    //adding the columns
    let rowCount = groupedObj[0].data.arr.length
    for(let i=0;i<rowCount;i++) {
      let row = document.createElement('tr')
      groupedObj.forEach(cell => {
        let td = document.createElement('td')
        td.textContent = `${cell.data.arr[i]}`
        row.appendChild(td)
      })
      tBody.appendChild(row)
    }

    let totals = document.createElement('tr')
    for(let sum of groupedObj) {
      let td = document.createElement('td')
      td.textContent = `${sum.data.sum}`
      totals.appendChild(td)
      tBody.appendChild(totals)
    }
    table.appendChild(tBody)
    return table
  }
  
  action() {}
  
}

addComponent('data-table',DataTableComponent)