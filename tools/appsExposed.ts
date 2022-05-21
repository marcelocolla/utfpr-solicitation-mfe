interface ModuleExposes {
  [key: string]: string
}

const appsExposed: ModuleExposes = {
  './SolicitationRoutes': './src/app/RoutesApp.tsx',
}

export default appsExposed
