import React from 'react'

import { RouteProps } from 'react-router-dom'

const HomePageLazy = React.lazy(() => import('pages/Home'))

export const getRoutesMap = (basename = '/solicitacoes'): RouteProps[] => {
  return [
    {
      exact: true,
      path: basename,
      component: HomePageLazy,
    },
    {
      path: '*',
      component: HomePageLazy,
    },
  ]
}
