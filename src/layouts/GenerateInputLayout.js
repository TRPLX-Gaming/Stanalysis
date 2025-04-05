import Layout from './../Layout.js';
import {getComponent} from './../../ComponentModuleManager.js';

export default class GenerateInputLayout extends Layout {
  constructor(app,title) {
    super(app,title)
    this.title = 'Grouped Data Input'
    this.components = []
    this.content = document.createDocumentFragment()
  }
  
  inputComponent
  generateButton
  
  buildContent() {
    const InputComponent = getComponent('input-elem')
    const GenerateButtonComponent = getComponent('generate-btn')
    
    this.inputComponent = new InputComponent('',{className:'generate-input',placeholder:'Input the number of rows your data has...'}).build()
    this.addComponent(this.inputComponent)
    
    this.generateButton = new GenerateButtonComponent()
    this.addComponent(this.generateButton.build())
    
  }
  
  setup() {
    this.buildContent()
    this.appendContent()
  }
  
  handleDelegations(target) {
    if (target.matches('.generate-btn')) {
      this.generateButton.action(this.inputComponent)
    }
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