import Layout from './../Layout.js';
import {getComponent} from './../../ComponentModuleManager.js';
import {numRows} from './../../components/GenerateButtonComponent.js';

export default class GroupedInputLayout extends Layout {
  constructor(app,title) {
    super(app,title)
    this.title = 'Grouped Data Input'
    this.components = []
    this.content = document.createDocumentFragment()
  }
  
  inputTable
  analysisBtn
  
  buildContent() {
    const GroupedInputComponent = getComponent('group-input-table')
    const GroupedAnalysisBtn = getComponent('group-calc')
    
    this.inputTable = new GroupedInputComponent()
    this.addComponent(this.inputTable.build(numRows()))
    
    this.analysisBtn = new GroupedAnalysisBtn()
    this.addComponent(this.analysisBtn.build())
  }
  
  handleDelegations(target) {
    if (target.matches('.grouped-calc-btn')) {
      this.analysisBtn.action(this.inputTable)
    }
  }
  
  setup() {
    this.buildContent()
    this.appendContent()
  }
  
  render() {
    this.app.replaceChildren()
    this.app.appendChild(this.content)
    this.titleDisplay.textContent = this.title
    this.active = true
  }
  
  cleanup() {
    this.active = false
    this.components.length = 0
  }
  
}