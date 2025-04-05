// base component class
export default class Component {
  constructor(text='text',config={color:'black',className:'.default',}) {
    this.text = text
    this.color = config.color
    this.className = config.className
  }
  
  build() {
    let element = document.createElement('h1')
    element.textContent = this.text
    element.setAttribute('class',`${this.className}`)
    return element
  }
  
  action() {
    console.log('Element reaction')
  }
  
}