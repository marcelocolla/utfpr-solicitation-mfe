import { container } from 'webpack'
import {
  registerApps,
  moduleFederationConfig,
  moduleFederationSharedByReact,
} from '@utfprfabricadesoftware/utfpr-tools-react'

import pkgs from '../package.json'
import appsEntry from '../tools/appsEntry'
import appsExposed from '../tools/appsExposed'

function moduleFederation() {
  const config = moduleFederationConfig('utfpr_solicitation_mfe', {
    remotes: registerApps(appsEntry),
    shared: moduleFederationSharedByReact(pkgs.dependencies),
    exposes: appsExposed,
  })

  return new container.ModuleFederationPlugin(config)
}

export default moduleFederation
