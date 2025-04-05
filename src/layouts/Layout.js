export default class Layout {
  constructor(app,title) {
    this.app = app
    this.titleDisplay = title
    this.active = false
    this.title = 'layout shi'
    this.content = document.createDocumentFragment()
    this.components = []
  }
   
  //list out the components in the layout
  
  addComponent(component) {
    this.components.push(component)
  }
  
  buildContent() {
    //instantiate the aformentioned comps
    //add them to the comps array
  }
  
  appendContent() {
    //iteratively add the comps to the fragment
    this.components.forEach((component) => {
      this.content.appendChild(component)
    })
  }
  
  handleDelegations() {
    //main event delegator
  }
  
  setup() {
    //grouping method
    
  }
  
  render() {
    //actual rendering of the app
  }
  
  cleanup() {
    
  }
  
}
