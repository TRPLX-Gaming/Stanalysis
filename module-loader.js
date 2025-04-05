const modules = [
  'ComponentModuleManager',
  'components/Component',
  'components/ButtonComponent',
  'components/GroupedInputComponent',
  'components/GroupedAnalysisComponent',
  'components/CalculateButtonComponent',
  'components/ClearButtonComponent',
  'components/GenerateButtonComponent',
  'components/ConvertButtonComponent',
  'components/DeleteButtonComponent',
  'components/InputButtonComponent',
  'components/DataTableComponent',
  'components/GroupedTableComponent',
  'components/DivComponent',
  'components/DivWrapperComponent',
  'components/HeaderComponent',
  'components/InputComponent',
  'components/InputDisplayComponent',
  'components/PartitionTableComponent',
  'utils/GroupedArray',
  'utils/GroupedTableArray',
  'utils/UngroupedArray',
  'layouts/Layout',
  'layouts/menu_layout/HomeLayout',
  'layouts/ungrouped_layout/InputLayout',
  'layouts/ungrouped_layout/UngroupedAnalysisLayout',
  'layouts/ungrouped_layout/UngroupedConvertLayout',
  'layouts/grouped_layout/GenerateInputLayout',
  'layouts/grouped_layout/GroupedInputLayout',
  'layouts/grouped_layout/GroupedAnalysisLayout',
  'layouts/default_layout/DefaultLayout',
  'LayoutManager'
]

const loadedModules = new Map()

async function loadModules() {
  for(let moduleName of modules) {
    try {
      let module = await import(`./src/${moduleName}.js`)
      loadedModules.set(keyName(moduleName),module)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

function keyName(name='') {
  let finalName = name.split('/')
  return finalName[finalName.length - 1]
}

export async function allLoaded() {
  try {
    await loadModules()
    let ready = loadedModules.size === modules.length
    return {
      status:ready,
      pkgs:loadedModules
    }
  } catch(e) {
    throw new Error('Error in loading '+e)
  }
  
}