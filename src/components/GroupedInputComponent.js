import Component from './Component.js';
import {addComponent} from './../ComponentModuleManager.js';

class Row {
  constructor() {
    this.lowerClass = null
    this.upperClass = null
    this.freq = null
    this.element = this.build()
  }
  
  build() {
    let row = document.createElement('tr')
    
    let classCell = document.createElement('td')
    
    let min = document.createElement('input')
    let max = document.createElement('input')
    min.type = 'number'
    this.lowerClass = min
    max.type = 'number'
    this.upperClass = max
    classCell.appendChild(min)
    classCell.appendChild(max)
    
    let freqCell = document.createElement('td')
    let input = document.createElement('input')
    input.type = 'number'
    this.freq = input
    freqCell.appendChild(input)
    
    row.appendChild(classCell)
    row.appendChild(freqCell)
    return row
  }
  
}

export class GroupedInputComponent extends Component {
  constructor(text,config={className:'grouped-input-table'}) {
    super(text)
    this.className = config.className
    this.rows = []
    this.classIntervals = []
    this.freqs = []
    this.element = this.build()
  }
  
  build(n) {
    for(let i=1;i<=n;i++) {
      this.rows.push(new Row())
    }
    
    let table = document.createElement('table')
    table.setAttribute('class',this.className)
    
    let tHead = document.createElement('thead')
    
    let classHead = document.createElement('th')
    classHead.textContent = 'Class Intervals'
    tHead.appendChild(classHead)
    
    let freqHead = document.createElement('th')
    freqHead.textContent = 'Frequency'
    tHead.appendChild(freqHead)
    
    table.appendChild(tHead)
    
    let tBody = document.createElement('tbody')
    
    this.rows.forEach((cell) => {
      if (cell instanceof Row) {
        tBody.appendChild(cell.element)
      }
    })
    
    table.appendChild(tBody)
    return table
  }
  
  action() {
    this.classIntervals.length = 0
    this.freqs.length = 0
    this.rows.forEach(row => {
      this.classIntervals.push({
        min:row.lowerClass.value,
        max:row.upperClass.value
      })
      this.freqs.push(row.freq.value)
    })
    
    if (this.freqs.some(val => val === '') || this.classIntervals.some(val => val.min === '' || val.max === '')) {
      alert('Fill in the missing data')
      return
    }
    
    let cIntevs = this.classIntervals.map(val => ({
      min: parseInt(val.min),
      max: parseInt(val.max)
    }))
    
    let frequencies = this.freqs.map(Number)
    
    if (cIntevs.some(val => val.min < 1 || val.max < 1) || frequencies.some(val => val < 1)) {
      alert('Please input non-negative integers greater than zero')
      return
    }
    
    console.log(frequencies)
    console.log(cIntevs)
    return {
      cIntevs,
      frequencies
    }
  }
  
}

addComponent('group-input-table',GroupedInputComponent)