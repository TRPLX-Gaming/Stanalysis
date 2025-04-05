import Layout from './../Layout.js';
import {analyzedData,inputtedData} from './../../components/CalculateButtonComponent.js';
import {getComponent} from './../../ComponentModuleManager.js';

export default class UngroupedAnalysisLayout extends Layout {
  constructor(app,title) {
    super(app,title)
    this.title = 'Ungrouped Data Analysis'
    this.content = document.createDocumentFragment()
    this.components = []
  } 
  
  header
  inputtedDataDisplay
  arithmeticMean
  geometricMean
  harmonicMean
  range
  median
  mode
  meanDeviation
  standardDeviation
  convertDataBtn
  
  buildContent() {
    const HeaderComponent = getComponent('header')
    const ConvertButtonComponent = getComponent('convert-btn')
    
    this.header = new HeaderComponent('Analysis for the following data',{className:'ungrouped-header'})
    this.addComponent(this.header.build())
    
    console.log(inputtedData())
    
    this.inputtedDataDisplay = new HeaderComponent(`${inputtedData().sort((a,b) => a-b).join(' ')}`,{className:'data-display'})
    this.addComponent(this.inputtedDataDisplay.build())
    
    this.arithmeticMean = new HeaderComponent(`Arithmetic Mean: ${analyzedData().arithmeticMean}`,{className:'data-header'})
    this.addComponent(this.arithmeticMean.build())
    
    this.geometricMean = new HeaderComponent(`Geometric Mean: ${analyzedData().geometricMean}`,{className:'data-header'})
    this.addComponent(this.geometricMean.build())
    
    this.harmonicMean = new HeaderComponent(`Harmonic Mean: ${analyzedData().harmonicMean}`, { className: 'data-header' })
    this.addComponent(this.harmonicMean.build())
    
    this.range = new HeaderComponent(`Range: ${analyzedData().range}`,{className:'data-header'})
    this.addComponent(this.range.build())
    
    this.median = new HeaderComponent(`Median: ${analyzedData().median}`,{className:'data-header'})
    this.addComponent(this.median.build())
    
    this.mode = new HeaderComponent(`Mode: ${analyzedData().mode}`,{className:'data-header'})
    this.addComponent(this.mode.build())
    
    this.meanDeviation = new HeaderComponent(`Mean Deviation: ${analyzedData().meanDeviation}`,{className:'data-header'})
    this.addComponent(this.meanDeviation.build())
    
    this.convertDataBtn = new ConvertButtonComponent()
    this.addComponent(this.convertDataBtn.build())
    
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
     if(target.matches('.convert-btn')) {
        this.convertDataBtn.action()
     }
  }
  
  cleanup() {
    this.components.length = 0
  }
  
}