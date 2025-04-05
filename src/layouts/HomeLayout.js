import Layout from './../Layout.js'
import {getComponent} from './../../ComponentModuleManager.js';

export default class HomeLayout extends Layout {
  constructor(app,title) {
    super(app,title)
    this.title = 'Stanalysis, your all-in-one statistical tool(v0.0.1 - stable-beta)'
    this.content = document.createDocumentFragment()
    this.components = []
  }
  
  header
  footerFlex
  
  buildContent() {
    const HeaderComponent = getComponent('header')
    this.header = new HeaderComponent('Click me')
    this.addComponent(this.header.build())
    
    //refactor later
    this.footerFlex = document.createElement('footer')
    let hh = document.createElement('h1')
    hh.textContent = 'Made by TRPLX🤓'
    this.footerFlex.appendChild(hh)
    this.addComponent(this.footerFlex)
  }
  
  appendContent() {
    this.components.forEach((element) => {
      this.content.appendChild(element)
    })
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

  handleDelegations(target) {
    if(target.matches('.home-header')) {
      alert(`This is a very early release of this project, less than 2 weeks of active development\n
      just for you all to test. The suggestion form will be out soon`)
    }
    return 
  }
  cleanup() {
    this.components.length = 0
    this.active = false
  }
   
}