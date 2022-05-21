import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import moduleFederation from './moduleFederation'

const config: Configuration = {
  entry: './src/index.tsx',
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: ['../src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    moduleFederation(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}

export default config
