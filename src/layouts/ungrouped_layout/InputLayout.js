import Layout from './../Layout.js';
import {getComponent} from './../../ComponentModuleManager.js';

export default class InputLayout extends Layout {
  constructor(app,title) {
    super(app,title)
    this.title = 'Ungrouped Data Input'
    this.components = []
    this.content = document.createDocumentFragment()
  }
   
  inputComponent
  centeringInputComponent
  inputDisplayComponent
  centeringDivComponent
  inputButtonComponent
  clearButtonComponent
  calculateButtonComponent
  backspaceButtonComponent
  wrapperComponent
  
  buildContent() {
    const HeaderComponent = getComponent('header')
    const InputDisplayComponent = getComponent('input-display')
    const InputComponent = getComponent('input-elem')
    const DivWrapperComponent = getComponent('div-wrap')
    const InputButtonComponent = getComponent('input-btn')
    const ClearButtonComponent = getComponent('clear-btn')
    const DeleteButtonComponent = getComponent('delete-btn')
    const CalculateButtonComponent = getComponent('calc-btn')
    
    this.inputDisplayComponent = new InputDisplayComponent()
    this.addComponent(this.inputDisplayComponent.element)
    
    this.inputComponent = new InputComponent().build()
    this.centeringInputComponent = new DivWrapperComponent('',{className:'center-div'})
    this.addComponent(this.centeringInputComponent.build([this.inputComponent]))
    
    this.inputButtonComponent = new InputButtonComponent()
    this.clearButtonComponent = new ClearButtonComponent()
    this.calculateButtonComponent = new CalculateButtonComponent()
    this.backspaceButtonComponent = new DeleteButtonComponent()
    
    this.wrapperComponent = new DivWrapperComponent()
    this.addComponent(this.wrapperComponent.build([
      this.inputButtonComponent.build(),
      this.backspaceButtonComponent.build(),
      this.clearButtonComponent.build(),
      this.calculateButtonComponent.build()
    ]))
  }
  
  handleDelegations(target) {
    if (target.matches('.input-btn')) {
      this.inputButtonComponent.action(this.inputComponent,this.inputDisplayComponent)
    } else if(target.matches('.clear-btn')) {
      this.clearButtonComponent.action(this.inputDisplayComponent)
    } else if(target.matches('.ungrouped-calc-btn')) {
      this.calculateButtonComponent.action(this.inputDisplayComponent.element)
    } else if(target.matches('.delete-btn')) {
      this.backspaceButtonComponent.action(this.inputDisplayComponent)
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
    this.components.length = 0
    this.active = false 
  }
  
}
