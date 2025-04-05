export default class UngroupedArray {
  constructor(arr) {
    this.arr = arr.sort()
    this.arithmeticMean = this.getArithmeticMean()
    this.geometricMean = this.getGeometricMean()
    this.harmonicMean = this.getHarmonicMean()
    this.range = this.getRange()
    this.median = this.getMedian()
    this.mode = this.getMode()
    this.meanDeviation = this.getMeanDeviation()
  }
  
  getArithmeticMean() {
    return this.round(this.arr.reduce((a, b) => { return a + b }) / this.arr.length)
  }

  getGeometricMean() {
    return this.round(Math.pow(this.arr.reduce((a, b) => { return a * b }), (1 / this.arr.length)))
  }

  getHarmonicMean() {
    return this.round((this.arr.length) / (this.arr.map(x => 1 / x).reduce((a, b) => { return a + b })))
  }

  getRange() {
    return this.round(Math.max(...this.arr) - Math.min(...this.arr))
  }
  
  getMedian() {
    let length = this.arr.length
    if (length % 2 !== 0) {
      return this.arr[Math.floor(length/2)]
    }
    let m1 = this.arr[length/2]
    let m2 = this.arr[length/2 - 1]
    return this.round((m1 + m2)/2)
  }
  
  getMode() {
    let arr = this.arr
    let unique = [...new Set(arr)]
    let freqs = new Array(unique.length).fill(0)
    for(let i=0;i<arr.length;i++) {
      for(let j=0;j<unique.length;j++) {
        if (arr[i] === unique[j]) {
          freqs[j]++
        }
      }
    }
    let highest = Math.max(...freqs)
    let modeIndex = freqs.indexOf(highest)
    return unique[modeIndex]
  }
  
  round(num,dp=4) {
    if (typeof num !== 'number') {
      throw new Error('Invalid data type, number expected')
      return
    }
    return parseFloat(num.toFixed(dp))
  }
  
  getMeanDeviation() {
    let deviations = this.arr.map(x => Math.abs(this.arithmeticMean - x))
    return this.round(deviations.reduce((a, b) => { return a + b }) / this.arr.length)
  }
  
}