import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeStyles } from '@utfprfabricadesoftware/utfpr-lib-ui-react'

import RoutesApp from './RoutesApp'
import { useMockApp } from './useMockApp'

const MainApp = (): JSX.Element => {
  useMockApp()

  return (
    <React.StrictMode>
      <ThemeStyles />

      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default MainApp
