//Imports
import {allLoaded} from './module-loader.js';

//DOM
const app = document.querySelector('.body')
const title = document.querySelector('.title').children[0]
const btns = document.querySelectorAll('.menu-item')
const menuBtn = document.querySelector('.menu-btn')
const homeBtn = btns[0]
const ungroupedBtn = btns[1]
const groupedBtn = btns[2]
const indexedNumMode = btns[3]
const ratesMode = btns[4]
const graphicalMode = btns[5]
const userProfile = btns[6]
const settings = btns[7]

let loader = document.createElement('h1')
loader.textContent = 'Loading...'
loader.style.color = 'black'
loader.style.textAlign = 'center'
app.appendChild(loader)

async function main() {
  try {
    let ready = await allLoaded()
    if (ready.status) {
      loader.textContent = 'Loaded Successfully'
      console.log(ready.pkgs.size+' Modules loaded!')
      return ready.pkgs
    }
  } catch(e) {
    loader.textContent = 'Error in Loading'
    console.log(e)
  }
}

let data = await main()

async function initLayoutManager(pkgs) {
  const lmClass = pkgs.get('LayoutManager').LayoutManager
  const bridgeClass = pkgs.get('ComponentModuleManager').default
  const lmInst = new lmClass(pkgs,app,title)
  bridgeClass.lm = lmInst
  return lmInst
}

const layoutManager = await initLayoutManager(data)

menuBtn.onclick = ()=>{}

homeBtn.onclick = ()=>{
  layoutManager.renderLayout('home')
}
homeBtn.click()

ungroupedBtn.onclick = ()=>{
  layoutManager.renderLayout('ungrouped-input')
}

groupedBtn.onclick = ()=>{
  layoutManager.renderLayout('generate-input')
}

app.addEventListener('click',layoutManager.setupEventHandler())