export class LayoutManager {
  constructor(layoutModules, app, title) {
    this.app = app
    this.title = title
    this.activeLayout = null
    this.modules = layoutModules
    this.layouts = new Map()
    this.buildLayouts()
  }
  
  _homeLayout
  _inputLayout
  _ungroupedLayout
  _conversionLayout
  _generateInputLayout
  _groupedInputLayout
  _groupedAnalysisLayout
  _defaultLayout
  
  addLayoutData(name, obj) {
    this.layouts.set(name, obj)
  }
  
  buildLayouts() {
    let homeLayoutClass = this.modules.get('HomeLayout').default
    this._homeLayout = new homeLayoutClass(this.app,this.title)
    this.addLayoutData('home',this._homeLayout)
    
    let ungroupedInputClass = this.modules.get('InputLayout').default
    this._inputLayout = new ungroupedInputClass(this.app,this.title)
    this.addLayoutData('ungrouped-input',this._inputLayout)

    let ungroupedAnalysisClass = this.modules.get('UngroupedAnalysisLayout').default
    this._ungroupedLayout = new ungroupedAnalysisClass(this.app,this.title)
    this.addLayoutData('ungrouped-calc',this._ungroupedLayout)
    
    let convertClass = this.modules.get('UngroupedConvertLayout').default
    this._conversionLayout = new convertClass(this.app,this.title)
    this.addLayoutData('ungrouped-convert',this._conversionLayout)
    
    let generateInputLayoutClass = this.modules.get('GenerateInputLayout').default
    this._generateInputLayout = new generateInputLayoutClass(this.app,this.title)
    this.addLayoutData('generate-input',this._generateInputLayout)
    
    let groupedInputLayoutClass = this.modules.get('GroupedInputLayout').default
    this._groupedInputLayout = new groupedInputLayoutClass(this.app,this.title)
    this.addLayoutData('grouped-input',this._groupedInputLayout)
    
    let groupedAnalysisClass = this.modules.get('GroupedAnalysisLayout').default
    this._groupedAnalysisLayout = new groupedAnalysisClass(this.app,this.title)
    this.addLayoutData('grouped-calc',this._groupedAnalysisLayout)
    
  }
  
  renderLayout(name) {
    if (this.activeLayout) {
      this.activeLayout.cleanup()
      this.activeLayout = this.layouts.get(name)
      this.activeLayout.setup()
      this.activeLayout.render()
    } else {
      this.activeLayout = this.layouts.get(name)
      this.activeLayout.setup()
      this.activeLayout.render()
    }
  }
  
  setupEventHandler() {
    return (event) => {
      this.eventHandler(event.target)
    }
  }
  
  eventHandler(target) {
    if (this.activeLayout) {
      this.activeLayout.handleDelegations(target)
    }
  }
  
}