import { EnvironmentPlugin, Configuration } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import merge from 'webpack-merge'
import ESLintPlugin from 'eslint-webpack-plugin'

import commonConfig from './webpack.common'

const prodConfig: Configuration = {
  mode: 'production',
  output: {
    publicPath: 'auto',
    clean: true,
  },
  plugins: [
    new EnvironmentPlugin(Object.keys(process.env).filter((key) => key.startsWith('REACT_APP_'))),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CleanWebpackPlugin(),
  ],
}

export default merge(commonConfig, prodConfig)
