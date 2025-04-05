//soon to be deprecated based on system architecture flaws
// DEPRECATED
export default class StatsArray {
  constructor(arr) {
    this.arr = arr
    this.sturgesRule = Math.floor(1+(3.323*Math.log10(this.arr.length)))
    this.mean = this.arithmeticMean()
  }
  
  arithmeticMean() {
    return this.arr.reduce((a,b) => {return a+b})/this.arr.length
  }
  
  geometricMean() {
    return Math.pow(this.arr.reduce((a,b) => {return a*b}),(1/this.arr.length))
  }
  
  harmonicMean() {
    return (this.arr.length)/(this.arr.map(x => 1/x).reduce((a,b) => {return a+b}))
  }
  
  range() {
    return Math.max(...this.arr) - Math.min(...this.arr)
  }
  
  ungroupedMedian() {
    
  }
  
  ungroupedMode() {
    
  }
  
  groupedMedian() {
    
  }
  
  groupedMode() {
    
  }
  
  meanDeviation() {
    let deviations = this.arr.map(x => Math.abs(this.arithmeticMean()-x))
    return deviations.reduce((a,b) => {return a+b})/this.arr.length
  }
  
  getIntervals(n) {
    let result = []
    let minVal = Math.min(...this.arr)
    let maxVal = Math.max(...this.arr)
    for(let i=minVal;i<=maxVal;i+=n) {
      result.push({min:i,max:i+n-1})
    }
    return result
  }
  
  getFrequencies(n) {
    let intervals = this.getIntervals(n)
    let freqs = new Array(intervals.length).fill(0)
    for(let i=0;i<this.arr.length;i++) {
      for(let j=0;j<intervals.length;j++) {
        if (this.arr[i] >= intervals[j].min && this.arr[i] <= intervals[j].max) {
          freqs[j]++
        }
      }
    }
    return freqs
  }
  
  getClassMarks(n) {
    return this.getIntervals(n).map(obj => (obj.min+obj.max)/2)
  }
  
  getFX(n) {
    let arr1 = this.getClassMarks(n)
    let arr2 = this.getFrequencies(n)
    let range = Math.min(arr1.length,arr2.length)
    let result = new Array(range)
    for(let i=0;i<range;i++) {
      result[i] = arr1[i] * arr2[i]
    }
    return result
  }
  
  sumClassMarks(n) {
    return this.getClassMarks(n).reduce((a,b) => {return a+b})
  }
  
  sumFrequencies(n) {
    return this.getFrequencies(n).reduce((a,b) => {return a+b})
  }
  
  sumFX(n) {
    return this.getFX(n).reduce((a,b) => {return a+b})
  }
  
  getAssumedMean(n) {
    let classMarksArr = this.getClassMarks(n)
    return classMarksArr[Math.floor(classMarksArr.length/2)]
  }
  
  getDeviations(n) {
    return this.getClassMarks(n).map(num => num - this.getAssumedMean(n))
  }
  
  sumDeviations(n) {
    return this.getDeviations(n).reduce((a,b) => {return a+b})
  }
  
  shortMean(n) {
    return this.sumFX(n)/this.sumFrequencies(n)
  }
  
  getFD(n) {
    let arr1 = this.getDeviations(n)
    let arr2 = this.getFrequencies(n)
    let range = arr1.length
    let result = new Array(range)
    for (let i=0;i<range;i++) {
      result[i] = arr1[i] * arr2[i]
    }
    return result
  }
  
  sumFD(n) {
    return this.getFD(n).reduce((a,b) => {return a+b})
  }
  
  getCumulativeFrequency(n) {
    let arr = this.getFrequencies(n)
    let acc = arr[0]
    let result = [acc]
    for(let i=1;i<arr.length;i++) {
      acc += arr[i]
      result.push(acc)
    }
    return result
  }
  
  getU(n) {
    return this.getDeviations(n).map(num => num/n)
  }
  
  getFU(n) {
    let arr1 = this.getU(n)
    let arr2 = this.getFrequencies(n)
    let range = arr1.length
    let result = new Array(range)
    for (let i=0;i<range;i++) {
      result[i] = arr1[i] * arr2[i]
    }
    return result
  }
  
  sumFU(n) {
    return this.getFU(n).reduce((a,b) => {return a+b})
  }
  
  
  
}