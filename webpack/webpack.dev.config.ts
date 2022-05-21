import { HotModuleReplacementPlugin, Configuration, EnvironmentPlugin } from 'webpack'
import merge from 'webpack-merge'
import { webpackConfigDev } from '@utfprfabricadesoftware/utfpr-tools-react'

import commonConfig from './webpack.common'
import envLocal from '../tools/environment'

interface ConfigurationDev extends Configuration {
  devServer: {
    [key: string]: unknown
  }
}

const port = 4402

const devConfig: ConfigurationDev = {
  ...webpackConfigDev(port),
  plugins: [new EnvironmentPlugin(envLocal), new HotModuleReplacementPlugin()],
}

export default merge(commonConfig, devConfig)
