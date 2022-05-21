import { ModuleRegisterApps } from '@utfprfabricadesoftware/utfpr-tools-react'
import { SHARED_DOMAIN_DEFAULT } from './environment'

const initialsharedDomain = process.env.WEBPACK_SERVE ? SHARED_DOMAIN_DEFAULT : 'utfpr.edu.br/mfe'

const sharedDomain = process.env.REACT_APP_SHARED_DOMAIN || initialsharedDomain

const appsEntry: ModuleRegisterApps = {
  coreSharedMFE: {
    enabled: true,
    localName: 'utfpr-core-shared-mfe',
    remoteName: 'utfpr_core_shared_mfe',
    // url: 'http://localhost:4499/remoteEntry.js', // local
    url: `https://utfpr-core-shared-mfe.${sharedDomain}/remoteEntry.js`,
  },
}

export default appsEntry
