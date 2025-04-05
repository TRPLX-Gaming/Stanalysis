import Layout from './../Layout.js'
import {getComponent} from './../../ComponentModuleManager.js';

export default class DefaultLayout extends Layout {
  constructor(app,title) {
    super(app,title)
    this.components = []
    this.content = document.createDocumentFragment()
  }
}
