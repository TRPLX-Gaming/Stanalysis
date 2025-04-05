import GroupedArray from './GroupedArray.js';

export default class GroupedTableArray {//extends GroupedArray {
  constructor(classIntervals,frequencies) {
    //super()
    this.classIntervals = classIntervals
    this.formattedCI = this.formattedClassIntervals()
    this.frequencies = frequencies
    this.interval = this.getInterval()
    this.groupedObj = this.getGroupedData()
  }
  
  getInterval() {
    return this.classIntervals[0].max - this.classIntervals[0].min + 1
  }
  
  formattedClassIntervals() {
    return this.classIntervals.map(val => `${val.min} - ${val.max}`)
  }
  
  sumFrequencies() {
    return this.frequencies.reduce((a,b) => a+b)
  }
  
  getGroupedData() {
    return ([{
      title:'Class Intervals',
      data:{
        arr:this.formattedCI,
        sum:'Total'
      }
    },{
      title:'Frequencies',
      data:{
        arr:this.frequencies,
        sum:this.sumFrequencies()
      }
    }])
  }
  
}