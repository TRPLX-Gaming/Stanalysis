import Layout from './../Layout.js';
import {getComponent} from './../../ComponentModuleManager.js';
import {inputtedData} from './../../components/CalculateButtonComponent.js';
import {groupedData} from './../../components/ConvertButtonComponent.js';

export default class UngroupedConvertLayout extends Layout {
  constructor(app,title) {
    super(app,title)
    this.title = 'Ungrouped Data To Grouped Data'
  }
  
  header
  divWrapper
  dataDisplay
  dataTableComponent
  assumedMeanHeader
  meanHeader
  medianHeader
  modeHeader
  meanDevHeader
  varianceHeader
  standardDevHeader
  coeffMDHeader
  coeffSDHeader
  coeffQDHeader
  skewnessHeader
  qDevHeader
  pDevHeader
  // partitions
  quartileDataWrapper
  quartileData
  decileDataWrapper
  decileData
  percentileDataWrapper
  percentileData
  
  buildContent() {
    const HeaderComponent = getComponent('header')
    const DataTableComponent = getComponent('data-table')
    const DivWrapperComponent = getComponent('div-wrap')
    const PartitionTableComponent = getComponent('parts-table')
    
    this.header = new HeaderComponent('Conversion of the following ungrouped data',{className:'ungrouped-header'})
    this.addComponent(this.header.build())
    
    this.dataDisplay = new HeaderComponent(`${inputtedData().join(' ')}`,{className:'data-display'})
    this.addComponent(this.dataDisplay.build())
    
    this.assumedMeanHeader = new HeaderComponent(`Assumed Mean: ${groupedData().assumedMean}`,{className:'assumed-mean-header'})
    this.addComponent(this.assumedMeanHeader.build())
    
    this.dataTableComponent = new DataTableComponent()
    this.divWrapper = new DivWrapperComponent('',{className:'div-scroll-wrap'})
    this.addComponent(this.divWrapper.build([
      this.dataTableComponent.build(
        groupedData().groupedObj
      )
    ]))
    
    this.meanHeader = new HeaderComponent(`Overall Mean: ${groupedData().shortMean}`,{className:'data-header'})
    this.addComponent(this.meanHeader.build())
    
    this.modeHeader = new HeaderComponent(`Mode: ${groupedData().mode}`,{className:'data-header'})
    this.addComponent(this.modeHeader.build())
    
    this.medianHeader = new HeaderComponent(`Median: ${groupedData().median}`,{className:'data-header'})
    this.addComponent(this.medianHeader.build())
    
    this.meanDevHeader = new HeaderComponent(`Mean Deviation: ${groupedData().meanDeviation}`,{className:'data-header'})
    this.addComponent(this.meanDevHeader.build())
    
    this.coeffMDHeader = new HeaderComponent(`Coefficient of Mean Deviation: ${groupedData().coeffMeanDeviation}`,{className:'data-header'})
    this.addComponent(this.coeffMDHeader.build())
    
    this.varianceHeader = new HeaderComponent(`Variance: ${groupedData().variance}`,{className:'data-header'})
    this.addComponent(this.varianceHeader.build())
    
    this.standardDevHeader = new HeaderComponent(`Standard Deviation: ${groupedData().standardDeviation}`,{className:'data-header'})
    this.addComponent(this.standardDevHeader.build())
    
    this.coeffSDHeader = new HeaderComponent(`Coefficient of Standard Deviation: ${groupedData().coeffSD}`,{className:'data-header'})
    this.addComponent(this.coeffSDHeader.build())
    
    this.skewnessHeader = new HeaderComponent(`Skewness: ${groupedData().coeffSkewness}`,{className:'data-header'})
    this.addComponent(this.skewnessHeader.build())
    
    this.qDevHeader = new HeaderComponent(`Quartile Deviation: ${groupedData().quartileDeviation}`,{className:'data-header'})
    this.addComponent(this.qDevHeader.build())
    
    this.coeffQDHeader = new HeaderComponent(`Coefficient of Quartile Deviation: ${groupedData().coeffQD}`,{className:'data-header'})
    this.addComponent(this.coeffQDHeader.build())
    
    this.pDevHeader = new HeaderComponent(`Percentile Deviation: ${groupedData().percentileDeviation}`,{className:'data-header'})
    this.addComponent(this.pDevHeader.build())
    
    this.quartileDataWrapper = new DivWrapperComponent()
    this.quartileData = new PartitionTableComponent().build(groupedData().quartiles)
    this.addComponent(this.quartileDataWrapper.build([this.quartileData]))
    
    this.decileDataWrapper = new DivWrapperComponent()
    this.decileData = new PartitionTableComponent().build(groupedData().deciles)
    this.addComponent(this.decileDataWrapper.build([this.decileData]))
    
    this.percentileDataWrapper = new DivWrapperComponent()
    this.percentileData = new PartitionTableComponent().build(groupedData().percentiles)
    this.addComponent(this.percentileDataWrapper.build([this.percentileData]))
    
  }
  
  setup() {
    this.buildContent()
    this.appendContent()
  }
  
  render() {
    this.app.replaceChildren()
    this.app.appendChild(this.content)
    this.titleDisplay.textContent = this.title
  }
  
  handleDelegations(target) {
    
  }
  
  cleanup() {
    this.components.length = 0
  }
  
}