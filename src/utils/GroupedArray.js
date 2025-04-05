export default class GroupedArray {
  constructor(arr=[0],interval=0) {
    this.arr = arr
    this.sturgesRule = Math.floor(1+(3.323*Math.log10(this.arr.length)))
    this.interval = interval ?? this.sturgesRule
    this.classIntervals = this.getClassIntervals()
    this.formattedIntervals = this.formatClassIntervals()
    this.classMarks = this.getClassMarks()
    this.frequencies = this.filterFreq()
    this.assumedMean = this.getAssumedMean()
    this.deviations = this.getDeviations()
    this.FXs = this.getFX()
    this.FD = this.getFD()
    this.quartiles = this.getQuartiles()
    this.deciles = this.getDeciles()
    this.percentiles = this.getPercentiles()
    this.coeffSkewness = this.getCoeffSkewness()
    this.partitSkewness = this.getPartitSkewness()
    this.cumulativeFrequency = this.getCumulativeFreq()
    this.coding = this.getFirCoding()
    this.FU = this.getFU()
    this.meanDeviations = this.getMeanDeviations()
    this.FMD = this.getFMeanDevs()
    this.FMDsq = this.getFMeanDevsSq()
    this.quartileDeviation = this.getQuartileDev()
    this.percentileDeviation = this.getPercentileDev()
    this.variance = this.getVariance()
    this.standardDeviation = this.getStandardDev()
    this.meanDeviation = this.getMeanDeviation()
    this.coeffMeanDeviation = this.getCoeffMeanDev()
    this.coeffSD = this.getCoeffSD()
    this.coeffQD = this.getCoeffQD()
    this.mode = this.getMode()
    this.shortMean = this.getShortMean()
    this.longMean = this.getLongMean()
    this.codingMean = this.getCodingMean()
    this.median = this.getMedian()
    this.groupedObj = this.getGroupedData()
  }
  
  getClassIntervals() {
    let result = []
    let minVal = Math.min(...this.arr)
    let maxVal = Math.max(...this.arr)
    let n = this.interval
    for (let i = minVal; i <= maxVal; i += n) {
      result.push({ min: i, max: i + n - 1 })
    }
    return result
  }
  
  formatClassIntervals() {
    let result = []
    let temp
    this.filterCI().forEach((interval) => {
      temp = `${interval.min}-${interval.max}`
      result.push(temp)
    })
    return result
  }
  
  filterCI() {
    let a = this.getClassIntervals()
    let b = this.getFrequencies()
    return a.filter((obj,i) => b[i] !== 0)
  }
  
  getFrequencies() {
    let intervals = this.getClassIntervals()
    let freqs = new Array(intervals.length).fill(0)
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < intervals.length; j++) {
        if (this.arr[i] >= intervals[j].min && this.arr[i] <= intervals[j].max) {
          freqs[j]++
        }
      }
    }
    return freqs
  }
  
  filterFreq() {
    return this.getFrequencies().filter(f => f !== 0)
  }
  
  getClassMarks() {
    return this.filterCI().map(obj => (obj.min + obj.max) / 2)
  }
  
  getCumulativeFreq() {
    let arr = this.filterFreq()
    let acc = arr[0]
    let result = [acc]
    for (let i = 1; i < arr.length; i++) {
      acc += arr[i]
      result.push(acc)
    }
    return result
  }
  
  getAssumedMean() {
    let classMarksArr = this.getClassMarks()
    return classMarksArr[Math.floor(classMarksArr.length / 2)]
  }
  
  getSquaredClassMarks() {
    return this.round(this.getClassMarks().map(num => Math.pow(num,2)))
  }
  
  getFX() {
    return this.getClassMarks().map((val,i) => this.round(val * this.filterFreq()[i]))
  }
  
  getDeviations() {
    return this.getClassMarks().map(num => this.round(num - this.getAssumedMean()))
  }
  
  getFD() {
    return this.getDeviations().map((val,i) => this.round(val * this.filterFreq()[i]))
  }
  
  getFirCoding() {
    return this.getDeviations().map(num => this.round(num/this.interval))
  }
  
  getFU() {
    return this.getFirCoding().map((val,i) => this.round(val * this.filterFreq()[i]))
  }
  
  getMeanDeviations() {
    return this.getClassMarks().map(num => this.round(Math.abs(num - this.getShortMean())))
  }
  
  getFMeanDevs() {
    return this.getMeanDeviations().map((num,i) => this.round(num * this.filterFreq()[i]))
  }
  
  getFMeanDevsSq() {
    return this.getFMeanDevs().map(num => this.round(Math.pow(num,2)))
  }
  
  sumSet(arr) {
    return arr.reduce((a,b) => this.round(a+b))
  }
  
  sumFMDsq() {
    return this.sumSet(this.getFMeanDevsSq())
  }
  
  sumFMeanDevs() {
    return this.sumSet(this.getFMeanDevs())
  }
  
  sumMeanDeviations() {
    return this.sumSet(this.getMeanDeviations())
  }
  
  sumFirCoding() {
    return this.sumSet(this.getFirCoding())
  }
  
  sumFU() {
    return this.sumSet(this.getFU())
  }
  
  sumClassMarks() {
    return this.sumSet(this.getClassMarks())
  }
  
  sumFrequencies() {
    return this.sumSet(this.filterFreq())
  }
  
  sumDeviations() {
    return this.sumSet(this.getDeviations())
  }
  
  sumFX() {
    return this.sumSet(this.getFX())
  }
  sumFD() {
    return this.sumSet(this.getFD())
  }
  
  getShortMean() {
    return this.round((this.sumFX()/this.sumFrequencies()))
  }
  
  getLongMean() {
    return this.round(this.getAssumedMean() + (this.sumFD()/this.sumFrequencies()))
  }
  
  getCodingMean() {
    return this.round(this.getAssumedMean() + (this.interval * (this.sumFU()/this.sumFrequencies())))
  }
  
  round(num,dp=4) {
    if (typeof num !== 'number') {
      throw new Error('Invalid data type, number expected')
      return
    }
    return parseFloat(num.toFixed(dp))
  }
  
  getMedian() {
    let cf = this.getCumulativeFreq()
    let midPos = this.sumFrequencies()/2
    let medianIndex = 0
    for(let i=0;i<cf.length;i++) {
      if (cf[i] >= midPos) {
        medianIndex = i
        break
      }
    }
    let medianLCB = this.filterCI()[medianIndex].min - 0.5
    let cumulB4 = medianIndex > 0 ? cf[medianIndex - 1] : 0
    let medianFreq = this.filterFreq()[medianIndex]
    return this.round(medianLCB + (this.interval * ((midPos - cumulB4)/medianFreq)))
  }
  
  getMode() {
    let freqs = this.filterFreq()
    let highestFreq = Math.max(...freqs)
    if (highestFreq === 1) {
      return 'None'
    }
    let modeIndex = freqs.indexOf(highestFreq)
    let modeLCB = this.filterCI()[modeIndex].min - 0.5
    let fB = modeIndex > 0 ? freqs[modeIndex - 1] : 0
    let fA = modeIndex < (freqs.length - 1) ? freqs[modeIndex + 1] : 0
    return this.round(modeLCB + (this.interval * ((highestFreq - fB)/((2 * highestFreq) - fB - fA))))
  }
  
  getMeanDeviation() {
    return this.round(this.sumFMeanDevs()/this.sumFrequencies())
  }
  
  getVariance() {
    return this.round(this.sumFMDsq()/this.sumFrequencies())
  }
  
  getStandardDev() {
    return this.round(Math.sqrt(this.getVariance()))
  }
  
  getCoeffMeanDev() {
    return this.round(this.getMeanDeviation()/this.getShortMean())
  }
  
  getCoeffSD() {
    return this.round(this.getStandardDev()/this.getShortMean())
  }
  
  getPartition(n,k) {
    try {
      let partVal = (k * this.sumFrequencies())/n
      let cf = this.getCumulativeFreq()
      let nIndex = 0
      for(let i=0;i<cf.length;i++) {
        if (cf[i] >= partVal) {
          nIndex = i
          break
        }
      }
      if (nIndex === -1) {
        throw new Error('partit not found')
      }
      let nLCB = this.filterCI()[nIndex].min - 0.5
      let cumulB4 = nIndex > 0 ? cf[nIndex - 1] : 0
      let nFreq = this.filterFreq()[nIndex]
      return this.round(nLCB + (this.interval * (partVal - cumulB4) / nFreq))
    } catch(e) {
      console.log(e+' at '+n+' '+k)
      return null
    }
  }
  
  getQuartiles() {
    let result = {title:'Quartiles',data:{}}
    const LIMIT = 4
    for(let i=1;i<LIMIT;i++) {
      let id = `Q${i}`
      result.data[id] = this.getPartition(LIMIT,i) ?? 0
    }
    return result
  }
  
  getDeciles() {
    let result = {title:'Deciles',data:{}}
    const LIMIT = 10
    for(let i=1;i<LIMIT;i++) {
      let id = `D${i}`
      result.data[id] = this.getPartition(LIMIT,i) ?? 0
    }
    return result
  }
  
  getPercentiles() {
    let result = {title:'Percentiles',data:{}}
    const LIMIT = 100
    for(let i=1;i<LIMIT;i++) {
      let id = `P${i}`
      result.data[id] = this.getPartition(LIMIT,i) ?? 0
    }
    return result
  }
  
  getQuartileDev() {
    return this.round((this.getQuartiles().data.Q3 - this.getQuartiles().data.Q1)/2)
  }
  
  getCoeffQD() {
    return this.round((this.getQuartiles().data.Q3 - this.getQuartiles().data.Q1)/(2 * this.getQuartiles().data.Q2))
  }
  
  getPercentileDev() {
    return this.round(this.getPercentiles().data.P90 - this.getPercentiles().data.P10)
  }
  
  getPartitSkewness() {
    return this.round((this.getQuartiles().data.Q1 + this.getQuartiles().data.Q3 - this.getQuartiles().data.Q2)/(this.getQuartiles().data.Q3 - this.getQuartiles().data.Q1))
  }
  
  getCoeffSkewness() {
    let mode = this.getMode()
    if (typeof mode !== 'number') {
      return 'Mode not found'
    }
    return this.round((this.getShortMean() - mode/this.getStandardDev()))
  }
  
  getGroupedData() {
    return [{
      title: 'Class Intervals',
      data: {
        arr: this.formattedIntervals,
        sum: 'Total'
      }
    }, {
      title: 'Frequencies',
      data: {
        arr: this.frequencies,
        sum: this.sumFrequencies()
      }
    }, {
      title: 'Class Mark(x)',
      data: {
        arr: this.classMarks,
        sum: this.sumClassMarks()
      }
    }, {
      title: 'Cumulative Frequency',
      data: {
        arr: this.cumulativeFrequency,
        sum: this.cumulativeFrequency[this.cumulativeFrequency.length - 1]
      }
    }, {
      title: 'fx',
      data: {
        arr: this.FXs,
        sum: this.sumFX()
      }
    }, {
      title: 'd=x-A',
      data: {
        arr: this.deviations,
        sum: this.sumDeviations()
      }
    }, {
      title: 'fd',
      data: {
        arr: this.FD,
        sum: this.sumFD()
      }
    },{
      title:'u=(d/c)',
      data: {
        arr:this.coding,
        sum:this.sumFirCoding()
      }
    },{
      title:'fu',
      data:{
        arr:this.FU,
        sum:this.sumFU()
      }
    },{
      title:'|x-Mean|',
      data:{
        arr:this.meanDeviations,
        sum:this.sumMeanDeviations()
      }
    },{
      title:'f|x-Mean|',
      data:{
        arr:this.FMD,
        sum:this.sumFMeanDevs()
      }
    },{
      title:'f|x-Mean|²',
      data:{
        arr:this.FMDsq,
        sum:this.sumFMDsq()
      }
    }]
  }
  
}
