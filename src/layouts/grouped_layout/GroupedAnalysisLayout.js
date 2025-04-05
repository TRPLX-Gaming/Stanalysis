import Layout from './../Layout.js';
import {getComponent} from './../../ComponentModuleManager.js';
import {groupedData} from './../../components/GroupedAnalysisComponent.js';

export default class GroupedAnalysisLayout extends Layout {
  constructor(app, title) {
    super(app,title)
    this.title = 'Grouped Data Analysis'
    this.components = []
    this.content = document.createDocumentFragment()
  }
  
  groupTable
  
  buildContent() {
    const GroupedTableComponent = getComponent('grouped-table')
    
    this.groupTable = new GroupedTableComponent()
    this.addComponent(this.groupTable.build(groupedData().groupedObj))
    
  }
  
  setup() {
    this.buildContent()
    this.appendContent()
  }
  
  handleDelegations(target) {
    
  }
  
  render() {
    this.app.replaceChildren()
    this.app.appendChild(this.content)
    this.titleDisplay.textContent = this.title
    this.active = true
  }
  
  cleanup() {
    this.components.length = 0
    this.active = false
  }
  
}