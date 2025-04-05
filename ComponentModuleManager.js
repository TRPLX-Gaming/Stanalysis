const componentModules = new Map()

export function addComponent(name, component) {
  componentModules.set(name,component)
  console.log(`${componentModules.size} components loaded`)
} 

export function getComponent(name) {
  return componentModules.get(name)
}

class CommBridge {
  constructor() {  }
  static lm = null
  
  static updateLM(update) {
    switch (update) {
      case 'show-ungrouped-calc':
        CommBridge.lm.renderLayout('ungrouped-calc')
        break
      case 'convert-ungrouped':
        CommBridge.lm.renderLayout('ungrouped-convert')
        break
      case 'generate-grouped-table':
        CommBridge.lm.renderLayout('grouped-input')
        break
      case 'analyze-grouped-data':
        CommBridge.lm.renderLayout('grouped-calc')
      default:
        console.log(`Invalid update ${update}`)
    }
  }
  
}

export const updateLM = update => CommBridge.updateLM(update)

export default CommBridge